/*
 * Informations générales du site (page d'accueil, contact, pied de page)
 * et textes de l'interface. Pour ajouter une langue : ajouter son code
 * dans "languages" et dans chaque bloc { fr, en } de ce fichier.
 */

window.SITE = {

	// Langues disponibles. La première est la langue par défaut si celle du navigateur n'est pas gérée.
	languages: {
		fr: "Français",
		en: "English"
	},

	logo: "images/logo.png",
	email: "thibaulthody.contact@gmail.com",
	phone: { display: "07 78 90 62 85", tel: "+33778906285" },
	linkedin: "https://www.linkedin.com/in/thibault-hody-412004308/",

	// Catégories proposées dans le filtre de l'accueil (l'ordre est celui des boutons).
	// Un projet s'y rattache avec  types: ["gamejam"]  dans data/projects.js.
	types: {
		gamejam: { fr: "Game Jam",         en: "Game Jam" },
		school:  { fr: "Projets d'études", en: "School projects" },
		engine:  { fr: "Moteur & outils",  en: "Engine & tools" }
	},

	ui: {
		all:         { fr: "Tous", en: "All" },
		filterLabel: { fr: "Filtrer les projets par type", en: "Filter projects by type" },
		siteTitle:   { fr: "Portfolio de Thibault HODY", en: "Thibault HODY Portfolio" },
		welcome:     { fr: "Bienvenue dans mon Portfolio,<br />Vous trouverez ici les projets auxquels j’ai eu le plaisir de participer.",
		               en: "Welcome to my Portfolio,<br />You will find here the projects in which I had the pleasure to participate." },
		home:        { fr: "Accueil", en: "Home" },
		menu:        { fr: "Menu", en: "Menu" },
		city:        { fr: "Lyon (France)", en: "Lyon (France)" },
		noVideo:     { fr: "Votre navigateur ne supporte pas la lecture de vidéo.", en: "Your browser does not support video playback." }
	}
};
