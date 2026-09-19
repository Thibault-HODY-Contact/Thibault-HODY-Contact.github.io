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

	function langButtons() {
		return langs.filter(function (l) { return l !== lang; }).map(function (l) {
			return '<a class="button fit" href="#" data-lang="' + l + '">' + esc(SITE.languages[l]) + '</a>';
		}).join('');
	}

	function header(inner, classes) {
		return '<header id="header" class="' + classes + '">' + inner +
			'<ul class="actions stacked">' + langButtons() + '</ul></header>';
	}

	function menu() {
		return '<nav id="menu"><ul class="links"><li><a href="index.html">' + esc(ui('home')) + '</a></li></ul></nav>';
	}

	function footer(links, copyright) {
		var icons = (links || []).map(function (l) {
			return '<li><a href="' + esc(l.url) + '" class="icon brands alt ' + esc(l.icon) + '"><span class="label">' + esc(l.label || '') + '</span></a></li>';
		}).join('');
		return '<footer id="footer"><div class="inner"><ul class="icons">' + icons + '</ul>' +
			(copyright ? '<ul class="copyright"><li>&copy; ' + esc(copyright) + '</li></ul>' : '') +
			'</div></footer>';
	}

	// ---------- Accueil ----------

	function renderHome() {
		document.title = ui('siteTitle');

		var sorted = PROJECTS.map(function (p, i) { return { p: p, i: i }; })
			.sort(function (a, b) { return b.p.date.localeCompare(a.p.date) || a.i - b.i; })
			.map(function (x) { return x.p; });

		var tiles = sorted.map(function (p) {
			return '<article>' +
				'<span class="image"><img src="' + esc(p.thumb) + '" alt=""' + (p.audio ? ' data-audio="' + esc(p.audio) + '"' : '') + ' /></span>' +
				'<header class="major"><h3><a href="project.html?id=' + encodeURIComponent(p.id) + '" class="link">' + esc(t(p.title)) + '</a></h3>' +
				'<p>' + esc(formatDate(p)) + '</p></header></article>';
		}).join('');

		wrapper.innerHTML =
			header('<a href="index.html" class="logo"><img src="' + esc(SITE.logo) + '" alt="" width="60" height="60" /></a><nav></nav>', 'alt') +
			'<section id="banner" class="major"><div class="inner">' +
				'<header class="major"><h1>' + esc(ui('siteTitle')) + '</h1></header>' +
				'<div class="content"><p>' + ui('welcome') + '</p></div></div></section>' +
			'<div id="main"><section id="one" class="tiles">' + tiles + '</section></div>' +
			'<section id="contact"><div><div class="split">' +
				'<div class="contact-method"><span class="icon solid alt fa-envelope"></span><h3>' + esc(ui('contactMail')) + '</h3>' +
					'<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + '</a></div>' +
				'<div class="contact-method"><span class="icon solid alt fa-home"></span><h3>' + esc(ui('contactCity')) + '</h3>' +
					'<span>' + esc(ui('city')) + '</span></div>' +
			'</div></div></section>' +
			footer([{ icon: 'fa-linkedin-in', url: SITE.linkedin, label: 'LinkedIn' }]);
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
			menu() +
			'<section id="banner"><div class="inner"><span class="image"><img src="' + esc(p.banner) + '" alt="" /></span>' +
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
		var current = null;
		wrapper.querySelectorAll('#one article').forEach(function (article) {
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
