# Portfolio — Guelade Kevin

Portfolio single-page au style **HUD tactique / command-center** (Vue 3 + Vite).
Sombre, accents cyan, courbes ECG, scanlines — tout en CSS/SVG, ultra léger
(~120 ko transférés, photo comprise).

## Démarrer

```bash
npm install      # une seule fois
npm run dev      # serveur de dev -> http://localhost:5173
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build de production
```

## Modifier le contenu

**Tout** ton CV vit dans un seul fichier : [`src/data/portfolio.js`](src/data/portfolio.js).
Les composants ne font qu'afficher ces données — tu ne touches jamais au design
pour changer un texte.

- `identity.brief` → ton **résumé d'opération** (le seul texte « personnel », à écrire avec ta voix).
- `skills[].items[]` → tes technos ; `icon` = chemin [Devicon](https://devicon.dev) `dossier/fichier`
  (logo affiché en tableau), `invert: true` pour un logo noir, ou rien → glyphe générique.
- `missions`, `deployments`, `award`, `contact` → le reste du CV.

### Images des déploiements

Chaque déploiement affiche une vignette. Tant qu'aucune image n'est fournie, un
**placeholder** (monogramme + dégradé) s'affiche. Pour mettre ta vraie capture :

1. Dépose l'image dans `public/deployments/` (ex. `public/deployments/threesixty.jpg`).
2. Ajoute le champ `image` au déploiement dans `portfolio.js` :
   ```js
   { name: 'THREE SIXTY GYM', desc: {…}, stack: ['Flutter'],
     url: 'https://threesixty.fit', image: 'deployments/threesixty.jpg' },
   ```
Le chemin est relatif (compatible avec n'importe quel hébergeur).

> ⚠️ Données volontairement **absentes** (vie privée / non pertinentes pour un portfolio) :
> téléphone, date de naissance, nationalité, statut marital, adresse précise.
> Le seul canal de contact est l'**email**.

## Bilingue (FR / EN)

Le site est bilingue, sans dépendance externe (micro-i18n maison dans
[`src/i18n.js`](src/i18n.js)). La langue est détectée depuis le navigateur,
mémorisée dans `localStorage`, et changeable via le sélecteur `FR / EN` de l'en-tête.

- Les **textes du contenu** sont des objets `{ fr: '…', en: '…' }` dans `portfolio.js`.
- Les **libellés d'interface** (titres de panneaux, statuts…) sont dans le dictionnaire `UI` de `i18n.js`.

Pour **ajouter une langue** (ex. `es`) : ajoute `'es'` à `SUPPORTED`, une clé `es`
dans `UI`, et le champ `es` dans chaque texte de `portfolio.js`.

## Anonymat / non-indexation

La page demande explicitement aux moteurs de **ne pas l'indexer** :
- `<meta name="robots" content="noindex, nofollow, noarchive, …">` dans [`index.html`](index.html)
- [`public/robots.txt`](public/robots.txt) avec `Disallow: /`

> Note : ces directives sont respectées par les moteurs sérieux (Google, Bing…)
> mais ne **bloquent pas** l'accès à la page. Pour un vrai contrôle d'accès, il
> faudrait un mot de passe / une protection côté hébergeur.

Pour changer la photo : remplace `src/assets/operator.png` (le traitement
duotone cyan est appliqué automatiquement en CSS).

## Palette & polices

- Couleurs/espacements : variables CSS en haut de [`src/assets/hud.css`](src/assets/hud.css)
  (`--teal`, `--alert`, `--bg`…).
- Polices : *Chakra Petch* (titres) + *Share Tech Mono* (données), chargées via Google Fonts.

## Déploiement

`base: './'` est déjà configuré : déploie le dossier `dist/` tel quel sur
n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, etc.).

## Structure

Mise en page : **une seule colonne** avec un menu en haut (type éditorial) et un
footer riche, dans la palette HUD sombre/teal.

```
src/
  data/portfolio.js     ← ton contenu (à éditer)
  i18n.js               ← micro-i18n FR/EN + libellés d'interface
  assets/hud.css        ← styles + variables de thème
  assets/operator.png   ← ta photo
  components/
    HudHeader.vue       menu haut : avatar + nom + rôle · nav · ville/heure · ⌘K · FR/EN · Get in touch
    CommandMenu.vue     palette ⌘K (chaque ligne = une section)
    Hero.vue            APERÇU : bio + statut
    Arsenal.vue         COMPÉTENCES + OS (tableau de logos Devicon)
    Experience.vue      EXPÉRIENCE (missions + courbe « signal »)
    Deployments.vue     DÉPLOIEMENTS (1 vignette image par produit)
    Qualifications.vue  DÉCORATION (distinction)
    SiteFooter.vue      footer « Got an interesting problem? » + email/réseaux + colonnes
    Panel.vue           cadre réutilisable à coins crochetés
    Waveform.vue        courbe « signal » animée
    SignalBars.vue      barres de signal (langues)
  App.vue               mise en page 1 colonne + scroll-spy + ⌘K + révélations
```
