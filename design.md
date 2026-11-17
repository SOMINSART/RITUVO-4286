# Rituvo — design

Quiz d'onboarding (funnel) pour une app de routines quotidiennes. Structure inspirée des quiz type Pimzi : une question par écran, barre de progression, aperçu live à droite sur desktop. Contenu, nom et visuels originaux.

## Couleurs
- `--paper` #F3F5F9 — fond (gris bleuté très clair)
- `--ink` #111214 — texte, bordures fortes, bouton principal
- `--mute` #6B7080 — texte secondaire
- `--line` #DCE0E8 — bordures douces
- `--go` #22C55E — vert progression / validé (accent principal)
- `--go-deep` #15803D
- `--cream` #FBF6E4 — case active / mise en avant
- `--sun` #FFD43B — micro-accent (étoiles, badges)

## Typo
- Display : Bricolage Grotesque 700/800 (titres serrés, -0.02em)
- Body : Figtree 400/500/600

## Composants
- Option card : bordure 1.5px ink/10, radius 18px, emoji 28px à gauche, coche ronde à droite; sélection = bordure ink + fond cream + coche verte.
- Chips (multi) : pilule, sélection = fond ink texte blanc.
- Bouton principal : pilule ink, 56px, plein largeur colonne.
- Aperçu : mockup téléphone noir épais (bordure 10px ink), grille d'habitudes 3 colonnes façon "Ma journée", ronds de semaine qui se remplissent en vert.

## Motion
Transition de step : slide horizontal + fade (motion). Stagger des options 40ms.
