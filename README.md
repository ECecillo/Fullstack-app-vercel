# Lien vers la demo
https://ececillo-blogr-nextjs-prisma.vercel.app/

## Lien vers la doc qui explique les étapes de création et le Code Source : 
https://vercel.com/guides/nextjs-prisma-postgres

### Pour utiliser le projet en local

- Installation des packages
`npm i`

- Lancer le serveur Local 

`npm run dev`

**Important !!!**

Pour pouvoir utiliser l'application (authentification)

1. Aller sur Github.
2. Cliquer sur son image de profil en haut à droite.
3. Aller dans Settings > Developper Settings (En bas de toutes les catégories).
4. Aller dans OAuth.
5. Créer une nouvelle application.

| Catégorie  | Procédure  |
|---|---|
|  Application Name | Ce que vous voulez  |
|  Homepage Url | http://localhost:3000/  |
|  Authorization callback URL |  http://localhost:3000/api/auth |

6. Créer dans le dossier du projet un fichier `.env` et y mettre
```
# Url vers votre base de donnée (Heroku peut vous permettre d'en créer une rapidement).
DATABASE_URL="postgres://...."


# Developpement APP Variable
# Se trouve sur la page de l'application que vous venez de créer.
GITHUB_ID=....
# A générer sur cette même page.
GITHUB_SECRET=....
NEXTAUTH_URL=http://localhost:3000/api/auth
# Vous pouvez en créer une avec la commande : openssl rand -base64 32
SECRET=
```
7. Relancer votre serveur local et GO 🙂 

# Arborescence

| Dossiers  | Description  |
|---|---|
| components/  | Tous les composants que l'on utilise pour notre site   |
|  lib/ | Contient le fichier qui créer l'objet `PrismaClient`, permet de faire des requêtes à la BDD   |
| pages/  | Toutes les pages que NextJS utilise pour faire le Routage Dynamique et les pages d'API |
| prisma/  | Contient le shéma de notre BDD en Postgresql   |

### Précisions sur le dossier `/pages/api`

- Pour chaque dossier que l'on crée c'est un handler que l'on doit gérer.

- Ces handlers s'occupent de faire le Back-end, entre notre app et notre bdd.

## Prisma

### Crée les tables que l'on met dans le fichier `schema.prisma`

`npx prisma db push`

### Permet d'accèder au Panneau de Controle de Prisma

`npx prisma studio`

### Génère le `PrismaCLient` dans `lib/prisma.ts` que l'on utilise pour faire les appels à la bdd.

`npx prisma generate`

## Remarques

  Dans la demo, les opérations sur la BDD prennent beaucoup de temps car le serveur qui Host le site (vercel) est aux US et la BDD est en Europe, on a un délai de 3s.
  
  La base de donnée est crée et stocké sur le site Heroku, mais nous aurions très bien pu utiliser Microsoft Azure pour Host le tout mais cela aurait été un peu Overkill.


