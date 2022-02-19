# Fullstack Authentication Example with Next.js and NextAuth.js

This is the starter project for the fullstack tutorial with Next.js and Prisma. You can find the final version of this project in the [`final`](https://github.com/prisma/blogr-nextjs-prisma/tree/final) branch of this repo.

Link of Documentation followed : 

https://vercel.com/guides/nextjs-prisma-postgres


### Create the table in the database 

`npx prisma db push`

### Access prisma CLI Table 

`npx prisma studio`

### Generate Prisma schema in db

`npx prisma generate`

### Précisions sur le dossier `/pages/api`

Pour chaque dossier que l'on créer c'est un handler que l'on doit gérer.

Ce handler s'occupe de faire le Back-end entre notre app et notre bdd.