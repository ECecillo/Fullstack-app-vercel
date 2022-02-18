// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Ce fichier permettra de faire une seule définition de l'objet "prisma" que l'on utilisera pour nos request ...

// Créer une instance de prisma que l'on va nommer PrismaClient qui fait référence à ce que l'on a défini dans schema.prisma.
let prisma: PrismaClient;


// 
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
