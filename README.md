# Site portfolio VYTAL

Site vitrine de Vincent Dalgier Delmas (Vytal), hébergé gratuitement sur GitHub Pages.

C'est une seule page qui défile : Accueil, Qui suis-je, une section par catégorie de projets (Son, Image...), puis Contact. Le menu fait défiler jusqu'à la bonne section.

Adresse une fois en ligne : **https://vytaldd.github.io**

---

## 1. Mettre le site en ligne (à faire une seule fois)

1. Connecte-toi sur [github.com](https://github.com) avec le compte **VytalDD**.
2. En haut à droite, clique sur **+** puis **New repository**.
3. Dans **Repository name**, écris exactement : `VytalDD.github.io`
4. Laisse le dépôt en **Public**, ne coche rien d'autre, clique sur **Create repository**.
5. Sur la page qui s'ouvre, clique sur le lien **uploading an existing file**.
6. Ouvre le dossier `vytal-portfolio` sur ton Mac, sélectionne **tout son contenu** (pas le dossier lui-même, ce qu'il y a dedans) et glisse-le dans la page GitHub.
   - Le fichier `.nojekyll` est caché sur Mac : dans le Finder, fais `Cmd + Maj + .` pour l'afficher et l'inclure.
7. Clique sur **Commit changes**.
8. Va dans **Settings** > **Pages** : vérifie que **Source** est sur `Deploy from a branch`, branche `main`, dossier `/ (root)`, puis **Save**.
9. Attends 1 à 2 minutes : le site est en ligne sur https://vytaldd.github.io

### Activer le formulaire de contact (une seule fois)

Le formulaire utilise [FormSubmit](https://formsubmit.co), un service gratuit sans compte.
La toute première fois que quelqu'un l'utilise (fais un test toi-même), FormSubmit t'envoie un email
de confirmation sur ta boîte Gmail. Clique sur le bouton d'activation : les messages suivants arriveront directement dans ta boîte.

---

## 2. Modifier le site (au quotidien)

**Tout le contenu est dans un seul fichier : `contenu.yml`.**

1. Sur github.com, ouvre ton dépôt `VytalDD.github.io`.
2. Clique sur `contenu.yml`, puis sur l'icône **crayon** (Edit) en haut à droite du fichier.
3. Modifie le texte.
4. Clique sur **Commit changes** (vert), puis encore **Commit changes**.
5. Le site se met à jour tout seul en 1 à 2 minutes. Recharge la page.

Ça marche aussi depuis ton téléphone, dans le navigateur.

### Ajouter un projet

Copie un bloc existant et colle-le en dessous, dans la bonne catégorie, avec **exactement les mêmes espaces** au début des lignes :

```yaml
      - titre: "Clip"
        client: "Nom de l'artiste"
        roles: [Mixage et master, Sound design]
        lien: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
        image: ""
```

- **lien** : colle le lien YouTube ou Instagram. La carte devient cliquable et affiche le logo de la plateforme.
- **image** :
  - lien YouTube et `image: ""` : la miniature YouTube s'affiche automatiquement.
  - lien Instagram : il faut une image (Instagram ne fournit pas de miniature). Voir ci-dessous.

### Ajouter une image

1. Prépare une image JPG verticale (format proche de 4:5, environ 800 px de large, moins de 300 Ko idéalement).
2. Donne-lui un nom simple, sans espace ni accent : `clip-artiste.jpg`.
3. Sur GitHub, ouvre le dossier `images/projets`, clique sur **Add file** > **Upload files**, glisse l'image, **Commit changes**.
4. Dans `contenu.yml`, mets : `image: "images/projets/clip-artiste.jpg"`

### Ajouter, renommer ou supprimer une section de projets

Chaque élément de `categories:` est une section de la page, avec son lien dans le menu.
- Pour **ajouter une section** : copie un bloc qui commence par `- id:` et change `id` (sans espace ni accent), `titre` et `description`.
- Une catégorie **sans projet** (`projets: []`) n'apparaît pas sur le site. C'est le cas de « Réalisations » pour l'instant.
- L'ordre des catégories dans le fichier = l'ordre sur la page et dans le menu.

### Cacher un projet temporairement

Ajoute `# ` au début de chacune de ses lignes (comme pour Mobilypass, en cours de montage). Retire les `# ` pour le faire réapparaître.

### Changer l'ordre des projets

Le premier projet de la liste s'affiche en premier. Déplace simplement les blocs.

---

## 3. En cas de problème

Si le site affiche **« Oups, le site n'a pas pu se charger »**, c'est qu'il y a une petite erreur dans `contenu.yml`.
Le message indique le numéro de ligne. Causes les plus fréquentes :
- un espace en trop ou en moins en début de ligne (les blocs doivent être alignés) ;
- un guillemet ouvert mais pas fermé ;
- un texte contenant `:` sans guillemets autour.

Pour annuler une modification : dans le dépôt, onglet **Commits**, retrouve la version d'avant, ou demande à Jarvis.

---

## Structure des fichiers

| Fichier | Rôle | À modifier ? |
|---|---|---|
| `contenu.yml` | Tous les textes, projets et liens | **Oui** |
| `images/` | Photo de profil et images des projets | Oui (ajouts) |
| `index.html` | La page du site | Non |
| `assets/style.css` | Couleurs, mise en page | Non (sauf envie de changer le design) |
| `assets/site.js` | Le moteur qui lit `contenu.yml` | Non |
| `fonts/` | Polices Clofie et Plus Jakarta Sans | Non |

Couleurs : vert `#006c32`, beige `#fdedd7`, noir `#101110`.
