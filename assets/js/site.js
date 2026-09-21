/*
 * Génère les pages à partir de data/site.js et data/projects.js.
 * Doit être chargé AVANT assets/js/main.js (qui transforme le DOM créé ici).
 */
(function () {

	var SITE = window.SITE, PROJECTS = window.PROJECTS;
	var wrapper = document.getElementById('wrapper');

	// ---------- Langue ----------

	var langs = Object.keys(SITE.languages);

	function detectLang() {
		try {
			var saved = localStorage.getItem('lang');
			if (saved && SITE.languages[saved]) return saved;
		} catch (e) {}
		var prefs = navigator.languages || [navigator.language || ''];
		for (var i = 0; i < prefs.length; i++) {
			var code = String(prefs[i]).toLowerCase().split('-')[0];
			if (SITE.languages[code]) return code;
		}
		return langs[0];
	}

	var lang = detectLang();
	document.documentElement.lang = lang;

	// Texte { fr, en } -> texte dans la langue courante (repli sur la langue par défaut).
	function t(v) {
		if (v == null) return '';
		if (typeof v === 'string') return v;
		return v[lang] || v[langs[0]] || '';
	}
	function ui(key) { return t(SITE.ui[key]); }

	function formatDate(p) {
		if (p.dateText) return t(p.dateText);
		var parts = p.date.split('-');
		var d = new Date(Number(parts[0]), Number(parts[1] || 1) - 1, 1);
		var s = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(d);
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	// ---------- Helpers HTML ----------

	function esc(s) {
		return String(s).replace(/[&<>"]/g, function (c) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
		});
	}

	// Sélecteur de langue : mêmes boutons arrondis que les filtres, la langue courante est en blanc.
	function langButtons() {
		return '<div class="lang-switch" role="group" aria-label="Language">' + langs.map(function (l) {
			return '<button type="button" class="chip' + (l === lang ? ' is-active' : '') + '" data-lang="' + l + '" title="' + esc(SITE.languages[l]) +
				'" aria-pressed="' + (l === lang) + '">' + esc(l) + '</button>';
		}).join('') + '</div>';
	}

	function header(inner, classes) {
		return '<header id="header" class="' + classes + '">' + inner + langButtons() + '</header>';
	}

	// Projets du plus récent au plus ancien (à date égale : ordre du fichier).
	function sortedProjects() {
		return PROJECTS.map(function (p, i) { return { p: p, i: i }; })
			.sort(function (a, b) { return b.p.date.localeCompare(a.p.date) || a.i - b.i; })
			.map(function (x) { return x.p; });
	}

	function menu(currentId) {
		var links = sortedProjects().filter(function (p) { return p.id !== currentId; }).map(function (p) {
			return '<li><a href="project.html?id=' + encodeURIComponent(p.id) + '">' + esc(t(p.title)) + '</a></li>';
		}).join('');
		return '<nav id="menu"><ul class="links"><li><a href="index.html">' + esc(ui('home')) + '</a></li>' + links + '</ul></nav>';
	}

	function footer(links, copyright) {
		var icons = (links || []).map(function (l) {
			return '<li><a href="' + esc(l.url) + '" class="icon brands alt ' + esc(l.icon) + '"><span class="label">' + esc(l.label || '') + '</span></a></li>';
		}).join('');
		return '<footer id="footer"><div class="inner"><ul class="icons">' + icons + '</ul>' +
			(copyright ? '<ul class="copyright"><li>&copy; ' + esc(copyright) + '</li></ul>' : '') +
			'</div></footer>';
	}

	// Barre du bas de l'accueil : email, téléphone, ville et LinkedIn réunis.
	function contactBar() {
		function item(icon, label, href) {
			var inner = '<span class="icon ' + icon + '" aria-hidden="true"></span><span class="txt">' + esc(label) + '</span>';
			return href ? '<a class="item" href="' + esc(href) + '">' + inner + '</a>' : '<span class="item">' + inner + '</span>';
		}
		return '<footer id="footer" class="contact-bar"><div class="inner">' +
			item('solid fa-envelope', SITE.email, 'mailto:' + SITE.email) +
			item('solid fa-phone', SITE.phone.display, 'tel:' + SITE.phone.tel) +
			item('solid fa-map-marker-alt', ui('city')) +
			item('brands fa-linkedin-in', 'LinkedIn', SITE.linkedin) +
			'</div></footer>';
	}

	// Boutons de filtre : uniquement les types utilisés par au moins un projet.
	function filterBar() {
		var used = {};
		PROJECTS.forEach(function (p) { (p.types || []).forEach(function (k) { used[k] = true; }); });
		var keys = Object.keys(SITE.types).filter(function (k) { return used[k]; });
		if (!keys.length) return '';
		var chips = ['<button type="button" class="chip is-active" data-filter="all">' + esc(ui('all')) + '</button>'].concat(keys.map(function (k) {
			return '<button type="button" class="chip" data-filter="' + esc(k) + '">' + esc(t(SITE.types[k])) + '</button>';
		}));
		return '<div class="filters" role="group" aria-label="' + esc(ui('filterLabel')) + '">' + chips.join('') + '</div>';
	}

	// Fond du bandeau : les images des projets, en fondu enchaîné.
	function heroCarousel() {
		var seen = {};
		var srcs = sortedProjects().map(function (p) { return p.banner || p.thumb; })
			.filter(function (src) { return src && !seen[src] && (seen[src] = true); });
		return '<div class="hero-carousel" aria-hidden="true">' + srcs.map(function (src, i) {
			return '<div class="slide' + (i === 0 ? ' active' : '') + '" style="background-image:url(\'' + esc(src) + '\')"></div>';
		}).join('') + '</div>';
	}

	// ---------- Accueil ----------

	function renderHome() {
		document.title = ui('siteTitle');

		var tiles = sortedProjects().map(function (p) {
			return '<article data-types="' + esc((p.types || []).join(' ')) + '">' +
				'<span class="image"><img src="' + esc(p.thumb) + '" alt=""' + (p.audio ? ' data-audio="' + esc(p.audio) + '"' : '') + ' /></span>' +
				'<header class="major"><h3><a href="project.html?id=' + encodeURIComponent(p.id) + '" class="link">' + esc(t(p.title)) + '</a></h3>' +
				'<p>' + esc(formatDate(p)) + '</p></header></article>';
		}).join('');

		wrapper.innerHTML =
			header('<a href="index.html" class="logo"><img src="' + esc(SITE.logo) + '" alt="" width="60" height="60" /></a><nav></nav>', 'alt') +
			'<section id="banner" class="major hero">' + heroCarousel() + '<div class="inner">' +
				'<header class="major"><h1>' + esc(ui('siteTitle')) + '</h1></header>' +
				'<div class="content"><p>' + ui('welcome') + '</p></div></div></section>' +
			'<div id="main">' + filterBar() + '<section id="one" class="tiles">' + tiles + '</section></div>' +
			contactBar();
	}

	// ---------- Page projet ----------

	function renderSection(s, isFirstSpotlight) {
		var h = s.heading ? '<header class="major"><h' + (isFirstSpotlight ? 2 : 3) + '>' + esc(t(s.heading)) + '</h' + (isFirstSpotlight ? 2 : 3) + '></header>' : '';

		var btn = s.button ? '<ul class="actions"><li><a href="' + esc(s.button.url) + '" class="button">' + esc(t(s.button.label)) + '</a></li></ul>' : '';

		if (s.type === 'text') {
			return '<section><div class="inner"><header class="major"><h2>' + esc(t(s.heading)) + '</h2></header><p>' + t(s.text) + '</p>' + btn + '</div></section>';
		}

		if (s.type === 'background') {
			return '<section class="bg-passion" style="background-image: url(\'' + esc(s.image) + '\');"><div class="overlay"><div class="content"><div class="inner">' +
				h + '<p>' + t(s.text) + '</p></div></div></div></section>';
		}

		// spotlight
		var media;
		if (s.video) {
			media = '<div class="image"><video controls playsinline preload="metadata" width="99%" style="border-radius:10px;"><source src="' + esc(encodeURI(s.video)) + '#t=0.1" type="video/mp4">' + esc(ui('noVideo')) + '</video></div>';
		} else {
			var img = '<img src="' + esc(s.image) + '" alt="" data-position="' + esc(s.position || 'center center') + '" />';
			media = s.link ? '<a href="' + esc(s.link) + '" class="image">' + img + '</a>' : '<div class="image">' + img + '</div>';
		}
		return '<section' + (s.fit === 'contain' ? ' class="fit-contain"' : '') + '>' + media +
			'<div class="content"><div class="inner">' + h + '<p>' + t(s.text) + '</p>' + btn + '</div></div></section>';
	}

	function renderProject(p) {
		document.title = t(p.title) + ' — ' + ui('siteTitle');

		// Les blocs "text" sont hors de .spotlights ; on regroupe donc les blocs consécutifs.
		var html = '', inSpot = false;
		p.sections.forEach(function (s, i) {
			var part = renderSection(s, s.type === 'spotlight' && !p.sections.slice(0, i).some(function (x) { return x.type === 'spotlight'; }));
			var spot = s.type === 'spotlight' || s.type === 'background';
			if (spot && !inSpot) { html += '<section id="two" class="spotlights">'; inSpot = true; }
			if (!spot && inSpot) { html += '</section>'; inSpot = false; }
			html += part;
		});
		if (inSpot) html += '</section>';

		wrapper.innerHTML =
			header('<a href="index.html" class="logo"><strong>' + esc(p.logo[0]) + '</strong> <span>' + esc(p.logo[1] || '') + '</span></a>' +
				'<nav><a href="#menu">' + esc(ui('menu')) + '</a></nav>', 'alt style2') +
			menu(p.id) +
			'<section id="banner" class="hero"><div class="hero-carousel" aria-hidden="true"><div class="slide active" style="background-image:url(\'' + esc(p.banner) + '\')"></div></div><div class="inner">' +
				'<header class="major"><h1>' + esc(t(p.heading || p.title)) + '</h1></header>' +
				'<div class="content"><p>' + t(p.tagline) + '</p></div></div></section>' +
			'<div id="main">' + html + '</div>' +
			footer(p.links, p.copyright);
	}

	// ---------- Démarrage ----------

	var page = document.body.getAttribute('data-page');

	if (page === 'project') {
		var id = new URLSearchParams(location.search).get('id');
		var project = PROJECTS.filter(function (p) { return p.id === id; })[0];
		if (!project) { location.replace('index.html'); return; }
		renderProject(project);
	} else {
		renderHome();
	}

	// Changement de langue : on mémorise et on recharge.
	wrapper.addEventListener('click', function (e) {
		var a = e.target.closest ? e.target.closest('[data-lang]') : null;
		if (!a) return;
		e.preventDefault();
		try { localStorage.setItem('lang', a.getAttribute('data-lang')); } catch (err) {}
		location.reload();
	});

	// ---------- Son au survol des tuiles (accueil) ----------
	// Les navigateurs n'autorisent le son qu'après un premier clic/toucher/touche sur la page :
	// avant, le survol reste silencieux, sans erreur ni blocage.

	if (page !== 'project') {

		// Apparition progressive des cartes quand elles entrent à l'écran.
		var cards = wrapper.querySelectorAll('#one article');
		if ('IntersectionObserver' in window) {
			var seen = 0;
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (e) {
					if (!e.isIntersecting) return;
					e.target.style.setProperty('--delay', (seen++ % 4) * 90 + 'ms');
					e.target.classList.add('is-visible');
					io.unobserve(e.target);
				});
			}, { threshold: 0.15 });
			cards.forEach(function (c) { c.classList.add('reveal'); io.observe(c); });
		}

		// Filtre par type.
		var filters = wrapper.querySelector('.filters');
		if (filters) filters.addEventListener('click', function (e) {
			var chip = e.target.closest('.chip');
			if (!chip) return;
			var type = chip.getAttribute('data-filter'), n = 0;
			filters.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('is-active', c === chip); });
			cards.forEach(function (card) {
				var match = type === 'all' || (card.getAttribute('data-types') || '').split(' ').indexOf(type) > -1;
				card.classList.toggle('is-filtered-out', !match);
				if (!match) return;
				card.classList.remove('is-visible');
				void card.offsetWidth;                      // relance l'animation d'apparition
				card.style.setProperty('--delay', (n++ % 4) * 70 + 'ms');
				card.classList.add('is-visible');
			});
		});

		// Carrousel du bandeau (immobile si l'utilisateur préfère moins d'animations).
		var slides = wrapper.querySelectorAll('.hero-carousel .slide');
		var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (slides.length > 1 && !calm) {
			var idx = 0;
			setInterval(function () {
				if (document.hidden) return;
				slides[idx].classList.remove('active');
				idx = (idx + 1) % slides.length;
				slides[idx].classList.add('active');
			}, 5500);
		}

		var current = null;
		cards.forEach(function (article) {
			var img = article.querySelector('img');
			var src = img && img.getAttribute('data-audio');
			if (!src) return;
			var audio = null;

			article.addEventListener('mouseenter', function () {
				if (!audio) { audio = new Audio(src); audio.preload = 'none'; }
				if (current && current !== audio) { current.pause(); current.currentTime = 0; }
				current = audio;
				var p = audio.play();
				if (p && p.catch) p.catch(function () {});
			});
			article.addEventListener('mouseleave', function () {
				audio && (audio.pause(), audio.currentTime = 0);
				if (current === audio) current = null;
			});
		});
	}

})();
