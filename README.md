# Lien vers la demo
---
https://ececillo-blogr-nextjs-prisma.vercel.app/

## Lien vers la doc qui explique les étapes de création et le Code Source : 
---
https://vercel.com/guides/nextjs-prisma-postgres

# Arborescence
---
| Dossiers  | Description  |
|---|---|
| components/  | Tous les composants que l'on utilise pour notre site   |
|  lib/ | Contient le fichier qui créer l'objet PrismaClient nous permettant de faire des requêtes à la BDD   |
| pages/  | Toutes les pages que NextJS utilise pour faire le Routage Dynamique et les pages d'API |
| prisma/  | Contient le shéma de notre BDD en Postgresql   |

### Précisions sur le dossier `/pages/api`

- Pour chaque dossier que l'on créer c'est un handler que l'on doit gérer.

- Ces handlers s'occupent de faire le Back-end, entre notre app et notre bdd.

## Prisma
---
### Créer les tables que l'on met dans le fichier `schema.prisma`

`npx prisma db push`

### Permet d'accèder au Panneau de Controle de Prisma

`npx prisma studio`

### Génère le `PrismaCLient` dans `lib/prisma.ts` que l'on utilise pour faire les appels à la bdd.

`npx prisma generate`

## Remarque
---

  Dans la demo, les opérations sur la BDD prennent beaucoup de temps car le serveur qui host le site (vercel) est aux US et la BDD est en Europe, on a un délai de 3s.
  
  La base de donnée est créer et stocké sur le site Heroku, mais nous aurions très bien pu utiliser Microsoft Azure pour Host le tout mais cela aurait été un peu Overkill.


