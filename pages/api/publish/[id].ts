import prisma from "../../../lib/prisma";

// PUT method pour BDD

export default async function handle (req, res) {
    const postId = req.query.id;
    const post = await prisma.post.update({
        where: {id: Number(postId)},
        data: {published: true}, // Change la valeur du tuple avec postId à true.
    });
    res.json(post) ;
}