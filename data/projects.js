/*
 * ============================================================
 *  AJOUTER UN PROJET
 * ============================================================
 *  1. Copie un bloc { ... } ci-dessous et colle-le dans la liste PROJECTS.
 *  2. Change l'id, la date, les images et les textes. C'est tout :
 *     la tuile sur l'accueil et la page du projet sont générées toutes seules,
 *     triées de la plus récente à la plus ancienne (d'après "date").
 *
 *  Textes : { fr: "...", en: "..." }
 *    - Si "en" est absent, le texte français est affiché à la place.
 *    - Tu peux utiliser <strong>, <em>, <br> dans les textes.
 *
 *  Champs d'un projet
 *    id        identifiant unique, sert dans l'URL : project.html?id=<id>
 *    date      "AAAA-MM" ; le mois est traduit automatiquement (mars / March)
 *    dateText  (optionnel) texte libre à la place de la date formatée
 *    thumb     image de la tuile sur l'accueil
 *    banner    image de la bannière de la page projet
 *    audio     (optionnel) son joué quand on survole la tuile
 *    logo      [ "Mot en gras", "mot normal" ] affiché en haut de la page projet
 *    title     titre de la tuile (accueil)
 *    heading   grand titre de la page projet (par défaut : title)
 *    tagline   phrase sous le grand titre
 *    links     (optionnel) icônes du pied de page : { icon, url, label }
 *    copyright (optionnel) texte © du pied de page
 *    sections  contenu de la page, dans l'ordre. Types possibles :
 *
 *      { type: "text", heading, text }
 *          bloc de texte centré.
 *
 *      { type: "spotlight", image | video, link?, heading, text, button?, fit? }
 *          bloc image (ou vidéo) + texte.
 *          - image : chemin ; link : lien quand on clique dessus (optionnel)
 *          - video : chemin d'un .mp4
 *          - button : { label, url } bouton sous le texte
 *          - fit : "contain" pour ne pas recadrer l'image
 *          - position : "top center", "center center"... cadrage de l'image
 *
 *      { type: "background", image, heading, text }
 *          bloc plein largeur avec image de fond.
 */

window.PROJECTS = [

	{
		id: "killer-penguin",
		date: "2025-03",
		thumb: "images/pic18.png",
		banner: "images/pic18.png",
		audio: "audio/KillerPenguin.mp3",
		logo: ["Killer Penguin", "The Lost"],
		title: { fr: "KillerPenguin: The Lost", en: "KillerPenguin: The Lost" },
		heading: { fr: "KILLER-PENGUIN : The Lost" },
		tagline: {
			fr: "Un petit jeu de plateforme créé en une semaine pour la <strong>Brackeys Game Jam 2025.2</strong> sur Unity.",
			en: "A small platform game created in one week for the <strong>Brackeys Game Jam 2025.2</strong> on Unity."
		},
		links: [{ icon: "fa-itch-io", url: "https://apogriff.itch.io/killerpenguinthelost", label: "Itch.io" }],
		copyright: "Killer Penguin Team",
		sections: [
			{
				type: "spotlight",
				image: "images/BrackeysJam20252.png",
				link: "https://itch.io/jam/brackeys-14/rate/3850424",
				heading: { fr: "Le Projet", en: "The Project" },
				text: {
					fr: "Pour la <strong>Brackeys Game Jam 2025.2</strong>, dont le thème était <em>“Risk it for the Biscuit”</em>, il fallait créer un jeu où le risque et la récompense sont au cœur de l’expérience. Nous avons donc imaginé <strong>Killer Penguin: The Lost</strong>, un jeu de plateforme où un pingouin doit tout risquer pour retrouver ce qu’il a perdu. Chaque saut est un choix, chaque obstacle un danger — l’équilibre entre prudence et audace définit la victoire.",
					en: "For the <strong>Brackeys Game Jam 2025.2</strong>, whose theme was <em>“Risk it for the Biscuit”</em>, we had to create a game in which risk and reward are at the heart of the experience. We therefore imagined <strong>Killer Penguin: The Lost</strong>, a platform game where a penguin must risk everything to find what he lost. Each jump is a choice, each obstacle a danger — the balance between caution and boldness defines victory."
				},
				button: { label: { fr: "Page Game Jam", en: "Game Jam Page" }, url: "https://itch.io/jam/brackeys-14/rate/3850424" }
			},
			{
				type: "spotlight",
				video: "images/KillerPenguinCinematic.mp4",
				heading: { fr: "Un monde gelé plein de dangers", en: "A frozen world full of dangers" },
				text: {
					fr: "Dans <strong>Killer Penguin: The Lost</strong>, chaque niveau plonge le joueur dans un environnement glacial et impitoyable. Entre plateformes fragiles, pics de glace et créatures hostiles, il faut garder son sang-froid pour progresser. La difficulté augmente progressivement, récompensant la maîtrise du timing et la prise de risque calculée.",
					en: "In <strong>Killer Penguin: The Lost</strong>, each level immerses the player in a frozen and merciless environment. Between fragile platforms, ice spikes and hostile creatures, one must keep a cool head to progress. The difficulty increases progressively, rewarding mastery of timing and calculated risk-taking."
				},
				button: { label: { fr: "Découvrir le jeu", en: "Discover the game" }, url: "https://apogriff.itch.io/killerpenguinthelost" }
			},
			{
				type: "background",
				image: "images/pic17.png",
				heading: { fr: "Un projet fait avec passion", en: "A project made with passion" },
				text: {
					fr: "Ce jeu a été conçu en équipe pendant une semaine intense, où chaque membre a contribué à donner vie à cet univers. De la programmation à la direction artistique, en passant par la création sonore et le level design, tout a été pensé pour offrir une expérience fun et fluide, malgré le court délai de développement et la refonte totale du projet deux jours avant la fin.",
					en: "This game was designed as a team during an intense week in which each member contributed to bringing this universe to life. From programming to art direction, including sound creation and level design, everything was designed to offer a fun and fluid experience, despite the short development time and the complete redesign of the project two days before the end."
				}
			}
		]
	},

	{
		id: "undesired",
		date: "2025-04",
		thumb: "images/pic16.png",
		banner: "images/pic19.jpg",
		audio: "audio/Undesired.mp3",
		logo: ["Undesired", "OneRoom"],
		title: { fr: "Undesired | One Room", en: "Undesired | One Room" },
		heading: { fr: "Undesired - OneRoom" },
		tagline: {
			fr: "Un petit jeu \"One Room\" créé pour le 13ème anniversaire de <strong>\"Devs That Jam 36-hour Challenge\"</strong> sur Unity.",
			en: "A small \"One Room\" game created for the 13th anniversary of <strong>\"Devs That Jam 36-hour Challenge\"</strong> using Unity."
		},
		links: [{ icon: "fa-itch-io", url: "https://apogriff.itch.io/undesired-one-room", label: "Itch.io" }],
		copyright: "Undesired-OneRoom Team",
		sections: [
			{
				type: "spotlight",
				image: "images/pic21.png",
				link: "https://itch.io/jam/dtj36-13/rate/3510252",
				heading: { fr: "Le Projet", en: "The Project" },
				text: {
					fr: "Pour <strong>Devs That Jam 36-hour Challenge</strong>, dont le thème était <em>“One-Room”</em>, il fallait créer un jeu qui se passait entièrement dans une seule pièce. Nous avons donc imaginé <strong>Undesired-OneRoom</strong>, un jeu One-Room simple dont le but est de s'échapper de cette seule pièce dans laquelle se passe le jeu.",
					en: "For <strong>Devs That Jam 36-hour Challenge</strong>, whose theme was <em>“One-Room”</em>, we had to create a game that took place entirely in a single room. We therefore imagined <strong>Undesired-OneRoom</strong>, a simple One-Room game where the goal is to escape from the only room where the game takes place."
				},
				button: { label: { fr: "Page Game Jam", en: "Game Jam Page" }, url: "https://itch.io/jam/dtj36-13/rate/3510252" }
			},
			{
				type: "spotlight",
				video: "images/Undesired_OneRoom_Gameplay.mp4",
				heading: { fr: "Un gameplay fun et simple à comprendre", en: "Fun gameplay, easy to understand" },
				text: {
					fr: "Dans <strong>Undesired-OneRoom</strong>, chaque niveau se passe dans un appartement dont le décor change. Le décor est en lien avec l'énigme que le joueur doit résoudre pour avoir la clé qui lui permettra de sortir. Dans ce jeu, le joueur ne sera pas guidé et devra déterminer de lui-même comment trouver la clé à travers 3 niveaux de plus en plus compliqués et originaux.",
					en: "In <strong>Undesired-OneRoom</strong>, each level takes place in an apartment, with changing decor. The decor is connected to the puzzle the player must solve to get the key to exit. In this game, the player is not guided and must figure out how to find the key themselves through 3 increasingly challenging and original levels."
				},
				button: { label: { fr: "Découvrir le jeu", en: "Discover the game" }, url: "https://apogriff.itch.io/undesired-one-room" }
			},
			{
				type: "background",
				image: "images/pic22.png",
				heading: { fr: "La contrainte principale d'un One-Room", en: "The main constraint of a One-Room game" },
				text: {
					fr: "La contrainte principale dans ce projet est qu'avoir une salle qui ne change pas enlèverait tout le fun du jeu. Pour cela, on devait trouver un moyen de faire changer le décor et les énigmes sans que le joueur ne change de salle. Nous avons donc réfléchi à un système qui ferme le jeu quand le joueur ouvre la porte (avec un bruit significatif pour ne pas inquiéter le joueur) et quand le joueur ouvre à nouveau le jeu, il est dans le niveau suivant. Ainsi on a pu respecter le thème \"One Room\" tout en proposant des niveaux différents et intéressants. Le tout en moins de 36h avec une équipe réduite à 3 personnes.",
					en: "The main constraint in this project is that having a room that does not change would remove all the fun from the game. To solve this, we had to find a way to change the decor and puzzles without the player leaving the room. We devised a system where the game closes when the player opens the door (with a noticeable sound to avoid alarming the player), and when the player opens it again, they are in the next level. This allowed us to respect the \"One Room\" theme while offering different and interesting levels, all within 36 hours with a small team of 3 people."
				}
			}
		]
	},

	{
		id: "squadron24",
		date: "2025-03",
		thumb: "images/pic04.png",
		banner: "images/pic12.png",
		audio: "audio/Squadron24.mp3",
		logo: ["Squadron", "24"],
		title: { fr: "Squadron24", en: "Squadron24" },
		heading: { fr: "SQUADRON-24" },
		tagline: { fr: "Ce jeu est un Shoot'em Up 2D", en: "This game is a 2D Shoot'em Up" },
		links: [{ icon: "fa-itch-io", url: "https://apogriff.itch.io/squadron24", label: "Itch.io" }],
		sections: [
			{
				type: "text",
				heading: { fr: "Le Projet", en: "The Project" },
				text: {
					fr: "Pendant deux semaines, nous devions, à deux, réaliser un Shoot'em up 2D en utilisant la bibliothèque SFML du langage C++.",
					en: "For two weeks, we had to create, as a team of two, a 2D Shoot'em Up using the SFML library of the C++ language."
				}
			},
			{
				type: "spotlight",
				image: "images/pic20.png",
				link: "https://www.sfml-dev.org/documentation/3.0.2",
				heading: { fr: "Un jeu fait avec SFML", en: "A game made with SFML" },
				text: {
					fr: "SFML est une librairie de rendu 2D utilisant le langage C++. C'est loin d'être un moteur complet comme Unity, il ne possède pas non plus d'interface graphique, mais seulement les fonctions de base d'affichage, de mouvement, de collision et de son. Il a ici été imposé comme contrainte lors de ce projet pour pousser l'apprentissage du C++.",
					en: "SFML is a 2D rendering library using the C++ language, and it is far from being a complete engine like Unity. It also does not have any graphical interface, but only basic functions of display, movement, collision, and sound. It was imposed here as a constraint for this project in order to push the learning of C++."
				},
				button: { label: { fr: "Documentation SFML", en: "SFML Documentation" }, url: "https://www.sfml-dev.org/documentation/3.0.2" }
			},
			{
				type: "spotlight",
				video: "images/TrailerSquadron.mp4",
				heading: { fr: "Disponible en ligne", en: "Available online" },
				text: {
					fr: "Ce jeu a été mis en ligne sur Itch.io, une plateforme pour publier des jeux indépendants. Vous pouvez le tester ci-dessous.",
					en: "This game was uploaded on Itch.io, a platform for publishing independent games. You can try it below."
				},
				button: { label: { fr: "Itch.io", en: "Itch.io" }, url: "https://apogriff.itch.io/squadron24" }
			},
			{
				type: "spotlight",
				video: "images/GamePlaySquadron24.mp4",
				heading: { fr: "Une réaction inattendue !", en: "An unexpected reaction!" },
				text: {
					fr: "Bien que le jeu soit le produit d'un projet à courte durée, il a provoqué une réaction étonnante en étant mis en ligne sur Itch.io : à peine quelques heures après sa sortie, une vidéo est sortie sur YouTube en RUSSE.",
					en: "Even though the game is the result of a short-duration project, it provoked an unexpected reaction when it was uploaded on Itch.io: just a few hours after its release, a video came out on YouTube in RUSSIAN."
				},
				button: { label: { fr: "La chaîne du youtubeur en question", en: "The YouTuber's channel" }, url: "https://www.youtube.com/@cpp_coder/videos" }
			}
		]
	},

	{
		id: "glouglou-parc",
		date: "2025-02",
		thumb: "images/pic02.png",
		banner: "images/pic13.png",
		audio: "audio/glouglou.mp3",
		logo: ["GlouGlou", "Parc"],
		title: { fr: "GlouGlou Parc", en: "GlouGlou Parc" },
		heading: { fr: "GLOUGLOU-PARC" },
		tagline: {
			fr: "Un jeu mobile créé lors d'une Game-Jam organisée par l'entreprise Tap-Nation",
			en: "A mobile game created during a Game Jam organized by the company Tap-Nation"
		},
		links: [{ icon: "fa-itch-io", url: "https://glouglouparc.itch.io/glouglouparc", label: "Itch.io" }],
		copyright: "GlouGlou Project Team",
		sections: [
			{
				type: "text",
				heading: { fr: "Un jeu mobile", en: "A mobile game" },
				text: {
					fr: "GlouGlou-Parc est un jeu mobile de type clicker dans le thème des parcs d'attractions. Ce jeu prend aussi un aspect contemplatif grâce au design créé par les artistes présents sur le projet et à la musique qui crée une ambiance calme permettant de profiter du décor. Vous devrez donc cliquer sur le stand principal de votre parc d'attractions pour gagner de l'argent, et améliorer ou créer de nouveaux stands pour l'agrandir.",
					en: "GlouGlou-Parc is a mobile clicker-type game in the theme of amusement parks. This game also takes on a contemplative aspect thanks to the designs created by the artists present on the project and the music which creates a calm atmosphere allowing you to enjoy the scenery. You must therefore click on the main stand of your amusement park to earn money and improve or create new stands to expand your amusement park."
				}
			},
			{
				type: "spotlight",
				image: "images/TapNation.png",
				link: "https://www.tap-nation.io/",
				heading: { fr: "Un projet de Game-Jam", en: "A Game Jam project" },
				text: {
					fr: "Ce projet a été créé pour une Game-Jam organisée à l'école Gaming Campus à Lyon par l'entreprise TapNation, spécialisée dans les jeux mobiles. Nous devions donc créer un jeu mobile dans le thème des parcs d'attractions.",
					en: "This project was created for a Game Jam organized at the Gaming Campus school in Lyon by the company TapNation, specialized in mobile games. We therefore had to create a mobile game in the theme of amusement parks."
				},
				button: { label: { fr: "Tap-Nation", en: "Tap-Nation" }, url: "https://www.tap-nation.io/" }
			},
			{
				type: "spotlight",
				image: "images/parc.jpg",
				position: "top center",
				link: "https://glouglouparc.itch.io/glouglouparc",
				heading: { fr: "Disponible en ligne", en: "Available online" },
				text: {
					fr: "Nous avons publié le jeu sur itch.io, une plateforme pour publier des jeux indépendants. Vous pouvez le tester ci-dessous.",
					en: "We published the game on itch.io, a platform to publish independent games. You can test it below."
				},
				button: { label: { fr: "Itch.io", en: "Itch.io" }, url: "https://glouglouparc.itch.io/glouglouparc" }
			}
		]
	},

	{
		id: "chronopost-simulator",
		date: "2024-12",
		dateText: { fr: "2024/2025 (vacances de Noël)", en: "2024/2025 (Christmas holidays)" },
		thumb: "images/pic03.png",
		banner: "images/pic14.png",
		audio: "audio/chronopost.mp3",
		logo: ["ChronoPost", "Simulator"],
		title: { fr: "Chronopost Simulator", en: "Chronopost Simulator" },
		heading: { fr: "CHRONOPOST-SIMULATOR" },
		tagline: {
			fr: "Un jeu de simulation de livraison de colis créé pour une Game-Jam",
			en: "A parcel delivery simulation game created for a Game Jam"
		},
		links: [{ icon: "fa-itch-io", url: "https://sharkgamestudio.itch.io/chronopost-simulator", label: "Itch.io" }],
		copyright: "Chronopost Simulator Team",
		sections: [
			{
				type: "spotlight",
				image: "images/Gamejam.png",
				link: "https://itch.io/jam/beginners-jam-winter-2024/rate/3221048",
				heading: { fr: "Le Projet", en: "The Project" },
				text: {
					fr: "Pour la <strong>Beginner's Jam Winter 2024</strong>, dont le thème était <em>“Delivery”</em>, nous avons décidé de créer un jeu de livraison de colis pour coller au thème, mais ce n'était pas assez amusant. Nous avons donc imaginé <strong>Chronopost Simulator</strong>, un jeu reproduisant la livraison de vos colis par la société de livraison Chronopost.",
					en: "For the <strong>Beginner's Jam Winter 2024</strong>, whose theme was <em>“Delivery”</em>, we decided to create a parcel delivery game to match the theme, but it wasn’t fun enough. So we came up with <strong>Chronopost Simulator</strong>, a game reproducing how your packages are delivered by the Chronopost delivery company."
				},
				button: { label: { fr: "Page Game Jam", en: "Game Jam Page" }, url: "https://itch.io/jam/beginners-jam-winter-2024/rate/3221048" }
			},
			{
				type: "spotlight",
				image: "images/Colis.png",
				fit: "contain",
				link: "https://sharkgamestudio.itch.io/chronopost-simulator",
				heading: { fr: "Des livraisons express... et chaotiques !", en: "Express... and chaotic deliveries!" },
				text: {
					fr: "Dans <strong>Chronopost Simulator</strong>, vous incarnez un livreur débordé devant livrer tous ses colis avant la fin de la journée. Entre la circulation infernale et les obstacles improbables, chaque mission devient un défi contre la montre.<br>L’objectif : livrer le plus vite possible... sans tout casser !",
					en: "In <strong>Chronopost Simulator</strong>, you play as an overwhelmed delivery driver who must deliver all packages before the end of the day. Between heavy traffic and unexpected obstacles, every mission becomes a race against the clock.<br>The goal: deliver as fast as possible… without breaking everything!"
				},
				button: { label: { fr: "Jouer sur Itch.io", en: "Play on Itch.io" }, url: "https://sharkgamestudio.itch.io/chronopost-simulator" }
			},
			{
				type: "spotlight",
				video: "images/LevelDesignToolRoadTool.mp4",
				heading: { fr: "Un outil de Level Design", en: "A Level Design tool" },
				text: {
					fr: "Pour <strong>Chronopost Simulator</strong>, j'ai dû créer un outil de level design, notamment utilisé pour le placement des routes.",
					en: "For <strong>Chronopost Simulator</strong>, I had to create a level design tool, mainly used for placing roads."
				}
			}
		]
	}

];
