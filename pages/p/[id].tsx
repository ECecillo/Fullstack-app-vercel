import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Router from "next/router"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import { useSession } from "next-auth/react"
import prisma from "../../lib/prisma"

// Route Dynamic.

// SSR
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({ // On va cherche le tuple qui correspond à l'id que l'on cherche.
    where: {
      id: Number(params?.id) || -1,
    },
    include: { // Comme dans index.ts on demande à récupérer le nom de l'utilisateur qui correspond à notre query.
      author: {
        select: { name: true, email: true }
      }
    }
  })
  return {
    props: post,
  }
}

// Fonction async qu'on va utiliser pour le bouton publier.
async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

// Affiche les détails du Post surlequel on a cliqué 🙂 
const Post: React.FC<PostProps> = (props) => {
  // Récupère les infos de l'user.
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;

  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {/* 
          Si on a un Post pas publié et que l'utilisateur est bien connecté et que que le Post appartient à l'utilisateur on affiche le bouton publié. 
        */}
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {
          userHasValidSession && postBelongsToUser && (
            <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
