// ============================================================================
//  DONNÉES DU PORTFOLIO — tout ton contenu CV vit ici.
//  Les textes traduisibles sont des objets { fr, en } ; le helper t() (i18n.js)
//  choisit la bonne langue. Les noms propres / technos restent des chaînes.
// ============================================================================

export const identity = {
  callsign: 'GUELADE KEVIN',
  role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
  status: { fr: 'ACTIF', en: 'ACTIVE' },
  location: { fr: 'Abidjan · Côte d’Ivoire', en: 'Abidjan · Ivory Coast' },
  // ── RÉSUMÉ D'OPÉRATION ─────────────────────────────────────────────
  // 👉 C'est TA voix. Réécris ces 2-3 phrases (dans les deux langues)
  //    comme tu te présenterais à un recruteur.
  brief: {
    fr: "Développeur full-stack basé à Abidjan, je conçois et déploie des applications web et mobiles de bout en bout — du back-end (API REST, Symfony, Laravel, Spring Boot, NestJS) au front-end (Vue.js, Nuxt, React). Team-lead front-end, j’interviens sur des plateformes critiques (fintech, paiement mobile money, KYC) où la performance, la sécurité des API et l’expérience utilisateur ne sont pas négociables.",
    en: "Full-stack developer based in Abidjan, I design and ship web and mobile applications end to end — from the back-end (REST APIs, Symfony, Laravel, Spring Boot, NestJS) to the front-end (Vue.js, Nuxt, React). Front-end team lead, I work on mission-critical platforms (fintech, mobile-money payments, KYC) where performance, API security and user experience are non-negotiable.",
  },
}

export const contact = {
  email: 'kevinguelade@gmail.com',
  location: { fr: 'Abidjan, Côte d’Ivoire', en: 'Abidjan, Ivory Coast' },
}

export const languages = [
  { name: { fr: 'Français', en: 'French' }, level: { fr: 'Courant', en: 'Fluent' }, value: 100 },
  { name: { fr: 'Anglais', en: 'English' }, level: { fr: 'B1', en: 'B1' }, value: 55 },
]

// Compétences affichées en tableau de logos (Devicon). `icon` = chemin Devicon
// "dossier/fichier" ; `invert: true` pour les logos noirs (visibles sur fond sombre) ;
// sans `icon`, un glyphe générique est affiché.
export const skills = [
  {
    group: { fr: 'Langages', en: 'Languages' },
    items: [
      { name: 'JavaScript', icon: 'javascript/javascript-original' },
      { name: 'TypeScript', icon: 'typescript/typescript-original' },
      { name: 'PHP', icon: 'php/php-original' },
      { name: 'Java', icon: 'java/java-original' },
      { name: 'Python', icon: 'python/python-original' },
      { name: 'Dart', icon: 'dart/dart-original' },
      { name: 'Rust', icon: 'rust/rust-original', invert: true },
    ],
  },
  {
    group: { fr: 'Frameworks & Bibliothèques', en: 'Frameworks & Libraries' },
    items: [
      { name: 'Vue.js', icon: 'vuejs/vuejs-original' },
      { name: 'Nuxt', icon: 'nuxtjs/nuxtjs-original' },
      { name: 'React', icon: 'react/react-original' },
      { name: 'Angular', icon: 'angularjs/angularjs-original' },
      { name: 'Symfony', icon: 'symfony/symfony-original', invert: true },
      { name: 'Laravel', icon: 'laravel/laravel-original' },
      { name: 'Spring Boot', icon: 'spring/spring-original' },
      { name: 'NestJS', icon: 'nestjs/nestjs-original' },
      { name: 'Flutter', icon: 'flutter/flutter-original' },
      { name: 'Tailwind CSS', icon: 'tailwindcss/tailwindcss-original' },
      { name: 'Bootstrap', icon: 'bootstrap/bootstrap-original' },
    ],
  },
  {
    group: { fr: 'Bases de données', en: 'Databases' },
    items: [
      { name: 'MySQL', icon: 'mysql/mysql-original' },
      { name: 'PostgreSQL', icon: 'postgresql/postgresql-original' },
      { name: 'SQLite', icon: 'sqlite/sqlite-original' },
      { name: 'DuckDB', icon: 'duckdb/duckdb-original' },
    ],
  },
  {
    group: { fr: 'DevOps & Outils', en: 'DevOps & Tools' },
    items: [
      { name: 'Git', icon: 'git/git-original' },
      { name: 'CI/CD' },
      { name: 'Socket.io', icon: 'socketio/socketio-original', invert: true },
      { name: 'AWS LightSail' },
      { name: 'Amazon S3' },
    ],
  },
]

// Systèmes d'exploitation, affichés en tuiles avec logos (Devicon).
export const systems = [
  { name: 'Arch Linux', icon: 'archlinux/archlinux-original' },
  { name: 'Rocky Linux', icon: 'rockylinux/rockylinux-original' },
  { name: 'Ubuntu', icon: 'ubuntu/ubuntu-original' },
  { name: 'Windows', icon: 'windows11/windows11-original' },
]

// Expériences professionnelles = « OPÉRATEURS ». `signal` = cadence (décorative)
// de la courbe ECG de la carte ; aucune donnée n'est affichée comme telle.
export const missions = [
  {
    id: '01',
    org: { fr: 'Prestataire de paiement (PSP)', en: 'Payment Service Provider' },
    role: { fr: 'Développeur Full-Stack · Team-lead Front-end', en: 'Full-Stack Developer · Front-end Team Lead' },
    period: { fr: 'Août 2023 — Présent', en: 'Aug 2023 — Present' },
    active: true,
    signal: 138,
    stack: ['Vue.js', 'Nuxt', 'ReactJS', 'Express.js', 'WebSocket'],
    log: [
      {
        fr: 'Migration des projets existants vers les dernières versions de Vue.js, ReactJS et Nuxt.js.',
        en: 'Migrated existing projects to the latest Vue.js, ReactJS and Nuxt.js versions.',
      },
      {
        fr: 'Refactoring approfondi pour la conformité PCI DSS (Payment Card Industry Data Security Standard).',
        en: 'In-depth refactoring to reach PCI DSS compliance (Payment Card Industry Data Security Standard).',
      },
      {
        fr: 'Mise en place d’une surveillance temps réel des utilisateurs (RUM — Real User Monitoring).',
        en: 'Set up real-time user monitoring (RUM — Real User Monitoring).',
      },
      {
        fr: 'Intégration de diverses API REST pour renforcer les fonctionnalités de la plateforme.',
        en: 'Integrated various REST APIs to extend the platform’s features.',
      },
      {
        fr: 'Gestion concurrentielle des KYC via WebSocket et Express.js (édition simultanée multi-agents sécurisée).',
        en: 'Concurrent KYC handling via WebSocket and Express.js (secure simultaneous multi-agent editing).',
      },
      {
        fr: 'App mobile pour un client institutionnel : algorithme de compression et synchronisation offline.',
        en: 'Mobile app for an institutional client: data-compression algorithm and offline synchronization.',
      },
    ],
  },
  {
    id: '02',
    org: { fr: 'Plateforme Mobile Money', en: 'Mobile Money Platform' },
    role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    period: { fr: 'Mars 2022 — Juillet 2023', en: 'Mar 2022 — Jul 2023' },
    active: false,
    signal: 121,
    stack: ['Laravel', 'Vue.js', 'API REST', 'Google Maps'],
    log: [
      {
        fr: 'API REST de paiement : règlement de factures (eau & électricité), génération PDF / Excel.',
        en: 'Payment REST API: bill settlement (water & electricity), PDF / Excel generation.',
      },
      {
        fr: 'App mobile de paiement : paiement eau & électricité, messagerie support, géolocalisation (Google Maps).',
        en: 'Payment mobile app: water & electricity payment, support chat, geolocation (Google Maps).',
      },
      {
        fr: 'Applications web : site vitrine, monitoring des agents de collecte (coopérative d’épargne), back-office de gestion.',
        en: 'Web apps: showcase site, collection-agents monitoring (savings cooperative), management back-office.',
      },
    ],
  },
  {
    id: '03',
    org: { fr: 'Agence web', en: 'Web Agency' },
    role: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' },
    period: { fr: 'Jan. 2020 — Mars 2021', en: 'Jan 2020 — Mar 2021' },
    active: false,
    signal: 115,
    stack: ['Symfony', 'PHP', 'API REST'],
    log: [
      { fr: 'Développement de diverses API REST avec Symfony (PHP).', en: 'Built various REST APIs with Symfony (PHP).' },
      {
        fr: 'Application des bonnes pratiques pour garantir qualité, performance et expérience utilisateur.',
        en: 'Applied best practices to ensure quality, performance and user experience.',
      },
    ],
  },
  {
    id: '04',
    org: { fr: 'CONSULTANT INDÉPENDANT', en: 'INDEPENDENT CONSULTANT' },
    role: { fr: 'Développement & déploiement de sites / apps', en: 'Building & deploying sites / apps' },
    period: { fr: '2018 — Présent', en: '2018 — Present' },
    active: true,
    signal: 127,
    stack: ['Vue.js', 'Flutter', 'Tailwind', 'Shadcn'],
    log: [
      {
        fr: 'Conception et livraison de sites vitrines, back-offices et applications mobiles pour divers clients.',
        en: 'Designed and delivered showcase sites, back-offices and mobile apps for various clients.',
      },
      {
        fr: 'Voir le détail des déploiements dans la section « DÉPLOIEMENTS ».',
        en: 'See the breakdown in the “DEPLOYMENTS” section.',
      },
    ],
  },
]

// Missions freelance (clients) = « DÉPLOIEMENTS ».
export const deployments = [
  {
    name: 'NALACARE',
    desc: {
      fr: 'Application mobile destinée aux utilisateurs en Belgique pour trouver rapidement une sage-femme.',
      en: 'Mobile app for users in Belgium to quickly find a midwife.',
    },
    stack: ['Mobile'],
    url: 'https://nalacare.be/',
    image: 'img/nalacare.jpg',
  },
  {
    name: 'DATUMS SARL',
    desc: {
      fr: 'Application web d’analyse de données géographiques.',
      en: 'Web application for geographic data analysis.',
    },
    stack: ['Web', 'Data', 'GIS'],
    url: null, // 👉 ajoute l'URL si le site est en ligne
    image: 'img/datumsarl.jpg',
  },
  {
    name: 'SCI KERLAUD',
    desc: {
      fr: 'Site vitrine + back-office d’administration avec streaming vidéo intégré (consultation en ligne sans plateforme externe).',
      en: 'Showcase site + admin back-office with built-in video streaming (online viewing without any external platform).',
    },
    stack: ['Vue.js', 'Shadcn', 'Tailwind CSS'],
    url: 'https://scikerlau.ci/',
    image: 'img/scikerlau.jpg',
  },
  {
    name: 'THREE SIXTY GYM',
    desc: { fr: 'Application mobile pour le fitness.', en: 'Fitness mobile application.' },
    stack: ['Flutter'],
    url: 'https://threesixty.fit',
    image: 'img/three-sixty.jpg',
  },
  {
    name: 'BEAUTELIC',
    desc: {
      fr: 'App mobile de recherche / réservation de salons de beauté — Banque Malienne de Solidarité.',
      en: 'Mobile app to search / book beauty salons — Banque Malienne de Solidarité.',
    },
    stack: ['Flutter'],
    url: null,
  },
  {
    name: 'ASCOMA STORE',
    desc: {
      fr: 'Refonte complète du design web de la boutique d’assurance.',
      en: 'Complete web design overhaul of the insurance store.',
    },
    stack: ['Web', 'UI/UX'],
    url: 'https://www.ascomaassurancestore.com',
  },
  {
    name: 'BMS-CI',
    desc: {
      fr: 'Banque Malienne de Solidarité — présence web institutionnelle.',
      en: 'Banque Malienne de Solidarité — institutional web presence.',
    },
    stack: ['Web'],
    url: 'https://www.bms-ci.net',
  },
  {
    name: 'PERFORMANCE TRAINING',
    desc: { fr: 'Site web.', en: 'Website.' },
    stack: ['Web'],
    url: 'https://www.performance-tr.com',
  },
  {
    name: 'BALBINE',
    desc: { fr: 'Site web.', en: 'Website.' },
    stack: ['Web'],
    url: 'https://www.balbine.net',
  },
]

// Formations = « QUALIFICATIONS ».
export const education = [
  {
    year: '2021',
    title: { fr: 'Ingénieur de conception informatique', en: 'Computer Design Engineer’s degree' },
    org: {
      fr: 'Université Félix-Houphouët-Boigny — UFR Maths & Informatique',
      en: 'Félix-Houphouët-Boigny University — Maths & Computer Science',
    },
  },
  {
    year: '2021',
    title: {
      fr: 'Master MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises)',
      en: 'MIAGE Master’s (Computer Methods Applied to Business Management)',
    },
    org: { fr: 'Université Félix-Houphouët-Boigny', en: 'Félix-Houphouët-Boigny University' },
  },
  {
    year: '2018',
    title: { fr: 'Licence MIAGE', en: 'MIAGE Bachelor’s' },
    org: { fr: 'Université Félix-Houphouët-Boigny', en: 'Félix-Houphouët-Boigny University' },
  },
  {
    year: '2015',
    title: {
      fr: 'Licence 1 — Réseaux & Génie Logiciel (RGL)',
      en: 'First-year degree — Networks & Software Engineering (RGL)',
    },
    org: { fr: 'PIGIER Côte d’Ivoire', en: 'PIGIER Ivory Coast' },
  },
]

// Distinction = « DÉCORATION ».
export const award = {
  title: { fr: 'Vainqueur du Hackathon CinetPay', en: 'CinetPay Hackathon Winner' },
  date: { fr: '23 avril 2022', en: 'April 23, 2022' },
  desc: {
    fr: 'Chef d’équipe représentant le MIAGE sur la thématique du e-commerce et du paiement mobile money en Afrique. Deux projets livrés avec Spring Boot, WebSocket, Laravel et Vue.js.',
    en: 'Team lead representing MIAGE on e-commerce and mobile-money payments in Africa. Two projects delivered with Spring Boot, WebSocket, Laravel and Vue.js.',
  },
  stack: ['Spring Boot', 'WebSocket', 'Laravel', 'Vue.js'],
  link: {
    label: { fr: 'Lire l’article', en: 'Read the article' },
    url: 'https://digitalmag.ci/hackathon-de-cinetpay-miage-gi-fhb-remporte-le-grand-prix/',
  },
}

// Navigation du HUD (ancres de défilement).
export const nav = [
  { id: 'apercu', label: { fr: 'Aperçu', en: 'Overview' }, code: 'R5' },
  { id: 'arsenal', label: { fr: 'Compétences', en: 'Skills' }, code: 'M7' },
  { id: 'missions', label: { fr: 'Expérience', en: 'Experience' }, code: 'E2' },
  { id: 'deploiements', label: { fr: 'Déploiements', en: 'Deployments' }, code: 'H3' },
  { id: 'contact', label: { fr: 'Contact', en: 'Contact' }, code: 'Z9' },
]

// Localisation affichée dans l'en-tête (ville + fuseau IANA pour l'heure locale).
export const place = { city: 'ABIDJAN', tz: 'Africa/Abidjan', tzLabel: 'GMT' }

// Réseaux / liens externes.
// 👉 Remplace les URL par les tiennes (laisse l'item si tu veux le garder).
export const socials = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/' }, // TODO: ton profil
  { label: 'GitHub', url: 'https://github.com/' }, // TODO: ton profil
]

// Pied de page (style « Got an interesting problem? »).
export const footer = {
  headLead: { fr: 'Un problème', en: 'Got an' },
  headAccent: { fr: 'intéressant ?', en: 'interesting problem?' },
  headTail: { fr: 'Parlons-en.', en: "Let's talk about it." },
  blurb: {
    fr: "Je suis toujours ouvert aux échanges sur le produit, le design et la technologie — surtout ceux qui n'ont pas encore de réponse évidente. Je lis chaque message.",
    en: "I'm always open to conversations about product, design, and technology — especially the kind that don't have an obvious answer yet. I read every message.",
  },
  note: {
    fr: 'Conçu à Abidjan. Produit, design et code.',
    en: 'Built in Abidjan. Product, design, and code.',
  },
}
