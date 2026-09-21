#!/usr/bin/env node
/*
 * Assistant d'ajout de projet : pose quelques questions, copie tes images/vidéos
 * dans images/ et ajoute le bloc au bon endroit dans data/projects.js.
 *
 * Utilisation :  npm run new-project
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const FILE = process.env.PROJECTS_FILE || path.join(ROOT, 'data', 'projects.js');
const IMAGES = path.join(ROOT, 'images');

const rl = readline.createInterface({ input: process.stdin });
const lines = rl[Symbol.asyncIterator]();

function abort(message) {
	console.error('\n' + message + ' Rien n\'a été modifié.');
	process.exit(1);
}

async function ask(question, def, { required = false } = {}) {
	for (;;) {
		process.stdout.write(question + (def ? ` [${def}]` : '') + ' ');
		const { value, done } = await lines.next();
		const answer = (done ? '' : value.trim().replace(/^"(.*)"$/, '$1')) || def || '';
		if (answer || !required) return answer;
		if (done) abort('Saisie interrompue : champ obligatoire manquant.');
		console.log('  (obligatoire)');
	}
}

// Types disponibles = clés de "types" dans data/site.js.
function readTypes() {
	const window = {};
	new Function('window', fs.readFileSync(path.join(ROOT, 'data', 'site.js'), 'utf8'))(window);
	return Object.keys(window.SITE.types || {});
}

const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
	.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Chemin donné par l'utilisateur -> chemin relatif "images/xxx" (copie le fichier si besoin).
function useFile(p) {
	if (!p) return '';
	const abs = path.isAbsolute(p) ? p : path.resolve(ROOT, p);
	if (!fs.existsSync(abs)) {
		console.log(`  ! Fichier introuvable : ${p} (je garde le chemin tel quel, pense à l'ajouter dans images/)`);
		return p.split(path.sep).join('/');
	}
	if (path.dirname(abs) === IMAGES) return 'images/' + path.basename(abs);
	const name = path.basename(abs).replace(/[^A-Za-z0-9._-]+/g, '_');
	fs.mkdirSync(IMAGES, { recursive: true });
	fs.copyFileSync(abs, path.join(IMAGES, name));
	console.log(`  -> copié dans images/${name}`);
	return 'images/' + name;
}

// { fr, en } ; si l'anglais est vide on ne met que le français.
async function askText(label) {
	const fr = await ask(`${label} (FR) :`, '', { required: true });
	const en = await ask(`${label} (EN, Entrée = pas de traduction) :`);
	return en ? { fr, en } : { fr };
}

async function askSection() {
	const kind = await ask('\nAjouter une section ? v = vidéo+texte, i = image+texte, t = texte seul, f = fond plein largeur, Entrée = terminer :');
	if (!kind) return null;
	if (!'vitf'.includes(kind) || kind.length > 1) { console.log('  Choix inconnu, section ignorée.'); return undefined; }
	const heading = await askText('  Titre de la section');
	const text = await askText('  Texte');
	if (kind === 't') return { type: 'text', heading, text };
	if (kind === 'f') return { type: 'background', image: useFile(await ask('  Image de fond :', '', { required: true })), heading, text };
	const s = { type: 'spotlight' };
	if (kind === 'v') s.video = useFile(await ask('  Fichier vidéo (.mp4) :', '', { required: true }));
	else {
		s.image = useFile(await ask('  Fichier image :', '', { required: true }));
		const link = await ask('  Lien au clic sur l\'image (Entrée = aucun) :');
		if (link) s.link = link;
	}
	s.heading = heading;
	s.text = text;
	const url = await ask('  Lien du bouton (Entrée = pas de bouton) :');
	if (url) s.button = { label: await askText('  Texte du bouton'), url };
	return s;
}

// Objet JS lisible : les petits objets/tableaux restent sur une ligne, clés sans guillemets.
function toSource(v, indent = '\t') {
	if (v === null || typeof v !== 'object') return JSON.stringify(v);
	const isArray = Array.isArray(v);
	const parts = isArray
		? v.map(x => toSource(x, indent + '\t'))
		: Object.keys(v).filter(k => v[k] !== undefined).map(k => `${k}: ${toSource(v[k], indent + '\t')}`);
	const [open, close] = isArray ? ['[', ']'] : ['{', '}'];
	if (!parts.length) return open + close;
	const flat = isArray ? `[${parts.join(', ')}]` : `{ ${parts.join(', ')} }`;
	if (flat.length <= 100 && !flat.includes('\n')) return flat;
	return `${open}\n${parts.map(x => indent + '\t' + x).join(',\n')}\n${indent}${close}`;
}

(async () => {
	console.log('=== Nouveau projet === (Entrée pour valider / garder la valeur par défaut)\n');
	const title = await askText('Titre du projet');
	const p = {};
	p.id = await ask('Identifiant (dans l\'URL) :', slug(title.fr));
	p.date = await ask('Date AAAA-MM :', new Date().toISOString().slice(0, 7));
	if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(p.date)) abort('Date invalide (attendu AAAA-MM).');

	const existing = fs.readFileSync(FILE, 'utf8');
	if (existing.includes(`id: "${p.id}"`)) abort(`Un projet "${p.id}" existe déjà.`);

	p.thumb = useFile(await ask('Image de la tuile (accueil) :', '', { required: true }));
	p.banner = useFile(await ask('Image de bannière :', p.thumb));
	const words = title.fr.split(/\s+/);
	p.logo = [words[0], words.slice(1).join(' ')];
	p.title = title;
	p.tagline = await askText('Phrase d\'accroche');
	const itch = await ask('Lien Itch.io / page du jeu (Entrée = aucun) :');
	if (itch) p.links = [{ icon: 'fa-itch-io', url: itch, label: 'Itch.io' }];
	const known = readTypes();
	const typesAnswer = await ask(`Types, séparés par des virgules (${known.join(', ')} ; Entrée = aucun) :`);
	const types = typesAnswer.split(',').map(x => x.trim()).filter(Boolean);
	const unknown = types.filter(x => !known.includes(x));
	if (unknown.length) abort(`Type inconnu : ${unknown.join(', ')} (types disponibles : ${known.join(', ')}).`);
	if (types.length) p.types = types;
	const audio = await ask('Son au survol (Entrée = aucun) :');
	if (audio) p.audio = useFile(audio);

	p.sections = [];
	for (let s; (s = await askSection()) !== null;) if (s) p.sections.push(s);

	// Insertion avant le "]" final de la liste, virgule comprise.
	const end = existing.lastIndexOf(']');
	let before = existing.slice(0, end).trimEnd();
	if (!/[,\[]$/.test(before)) before += ',';
	const next = before + '\n\n\t' + toSource(p) + '\n\n' + existing.slice(end);

	try { new Function(next); } catch (e) { abort('Le fichier généré serait invalide (' + e.message + ').'); }
	fs.copyFileSync(FILE, FILE + '.bak');
	fs.writeFileSync(FILE, next);
	console.log(`\nProjet ajouté dans ${path.relative(ROOT, FILE)} (sauvegarde : ${path.basename(FILE)}.bak).`);
	console.log(`Ouvre project.html?id=${p.id} pour le voir.`);
	process.exit(0);
})();
