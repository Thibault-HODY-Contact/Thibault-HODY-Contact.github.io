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
	linkedin: "https://www.linkedin.com/in/thibault-hody-412004308/",

	ui: {
		siteTitle:   { fr: "Portfolio de Thibault HODY", en: "Thibault HODY Portfolio" },
		welcome:     { fr: "Bienvenue dans mon Portfolio,<br />Vous trouverez ici les projets auxquels j’ai eu le plaisir de participer.",
		               en: "Welcome to my Portfolio,<br />You will find here the projects in which I had the pleasure to participate." },
		home:        { fr: "Accueil", en: "Home" },
		menu:        { fr: "Menu", en: "Menu" },
		contactMail: { fr: "Email", en: "Email" },
		contactCity: { fr: "Ville", en: "City" },
		city:        { fr: "Lyon (France)", en: "Lyon (France)" },
		noVideo:     { fr: "Votre navigateur ne supporte pas la lecture de vidéo.", en: "Your browser does not support video playback." }
	}
};
