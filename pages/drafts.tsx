import React from "react";
// Les Posts sont récupérés dans la partie SSR, va faire une pré-rendu côté serveur à chaque fois avant de charger la page.
import { GetServerSideProps } from "next";
// Récupère les infos de session de l'utilisateur
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post"
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    // Regarde si on a bien user connecté avec nextAuth
    const session = await getSession({ req });
    // Si c'est pas le cas on va afficher une page sans Post et on renvoie une erreur 403.
    if (!session) {
        res.statusCode = 403;
        return { props: { drafts: [] } };
    }

    // Envoie une requête à la database prisma pour avoir les Posts de l'utilisateur.
    const drafts = await prisma.post.findMany({
        where: {
            author: { email: session.user.email }, // session.user.email correspond aux infos dans l'objet session.
            published: false,
        },
        include: {
            // On va également demandé à récupérer le nom de l'utilisateur.
            author: {
                select: { name: true, email: true },
            },
        },
    });
    return {
        props: { drafts },
    };
};

type Props = {
    drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
    const { data: session } = useSession();
    if (!session) {
        return (
            <Layout>
                <h1>My Drafts</h1>
                <div>You need to be authenticated to view this page.</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="page">
                <h1>My Drafts</h1>
                <main>
                    {props.drafts.map((post) => (
                        <div key={post.id} className="post">
                            <Post post={post} />
                        </div>
                    ))}
                </main>
            </div>
            <style jsx>{`
          .post {
            background: var(--geist-background);
            transition: box-shadow 0.1s ease-in;
          }
  
          .post:hover {
            box-shadow: 1px 1px 3px #aaa;
          }
  
          .post + .post {
            margin-top: 2rem;
          }
        `}</style>
        </Layout>
    );
};

export default Drafts;
