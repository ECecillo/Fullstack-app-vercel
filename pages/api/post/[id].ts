// Fichier dans lequel on va définir le handler qui va s'occuper de dire à la BDD de delete un tuple.

import prisma from "../../../lib/prisma";


export default async function handler(req, res) {
    const postId = req.query.id;
    if (req.method === 'DELETE') // Vérifie si on a bien une requête de type DELETE
    {
        const post = await prisma.post.delete({
            where: { id: Number(postId) },
        });
        res.json(post);
    }
    else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}