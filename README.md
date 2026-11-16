# Codaix — portfolio en forme d'application

Version « app » du portfolio de Julien Charlier, avec le design de SnapNote (sombre, bleu, gros chiffre, tuiles, feuille latérale / basse).
Première ébauche locale, destinée à remplacer à terme le site `Atomik31.github.io`.

## Lancer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

## Structure

| Fichier | Rôle |
|---|---|
| `src/data/portfolio.json` | **Tout le contenu** (bilingue FR/EN), repris du site actuel |
| `src/lib/groups.js` | Familles de projets (filtres) et rattachement de chaque projet |
| `src/App.jsx` | Page profil en sections (Profil, Parcours, Compétences, Projets, Contact) et textes de l'interface |
| `src/components/` | Hero, Nav, Timeline, Skills, Projects, Detail, ContactSection, Sheet, Splash |
| `src/styles.css` | Design : variables en tête de fichier |
| `public/assets/` | Photo (celle de codaix.fr), image hero et CV (PDF) |

## Ajouter un projet

Ajouter une entrée dans `projects` de `portfolio.json` ; sans rattachement dans `groups.js`, il tombe dans la famille « Data science ».

## Publication (plus tard)

`vite build` produit `dist/` avec des chemins relatifs. Pour remplacer le site actuel : publier le contenu de `dist/` à la racine du dépôt `Atomik31.github.io` (ou via GitHub Actions + Pages).
