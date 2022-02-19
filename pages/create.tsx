// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => { // C'est comme ça que l'on défini une fonction pour React TSX.
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitData = async (e: React.SyntheticEvent) => { // <=> useEffect
    e.preventDefault();
    // Comme c'est une promesse Try, catch.
    try {
        // Récupère les variables d'états de notre composant et les mets dans la var body.
        const body = { title, content };
        // Envoie requête HTTP POST à l'API Route qui va s'occuper de la partie BDD.
        await fetch('/api/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        await Router.push('/drafts'); // On redirige l'utilisateur vers la page draft pour voir ces posts.
      } catch (error) {
        console.error(error); // Gère le cas où on a une erreur et affiche dans la console.
      }
  };

  // On affiche un formulaire que l'on va remplir, on submit on va envoyer toutes ces infos dans la BDD.
  return (
    /* On met le composant Layout pour avoir le header dans notre page. */
    <Layout>
      <div>
          {/* submitData handle notre envoie à la bdd */}
        <form onSubmit={submitData}>
          <h1>New Draft 🖥 </h1>
          {/* Titre */}
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)} // Change le state de "title"
            placeholder="Title"
            type="text"
            value={title}
          />
          {/* Texte du Post */}
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)} // Change le state de "content"
            placeholder="Content"
            rows={8}
            value={content}
          />
          {/* Disbaled le bouton dans que le titre et le contenu n'est pas remplis. 
            On submit, on appelle la fonction submitData en lui passant un event qui contient toutes nos valeurs. 
          */}
          <input disabled={!content || !title} type="submit" value="Create" />
          {/* On retourne à la page principale */}
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      {/* Le style 🕶 */}
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
