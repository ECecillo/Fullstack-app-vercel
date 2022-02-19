// pages/api/post/index.ts


// Retourne les infos de session actuels 
// https://next-auth.js.org/getting-started/client#getsession
import { getSession } from 'next-auth/react';
// Va chercher le PrismaClient pour envoyer des requêtes à la bdd.
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
    // On récupère les informations transmises dans la requête qui sont stockés dans req.body que l'on destruct.
    const { title, content } = req.body;

    // On vérifie si la requête vient d'un utilisateur connecté.
    const session = await getSession({ req });
    // Envoie la requête post à la bdd.
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result);
}
