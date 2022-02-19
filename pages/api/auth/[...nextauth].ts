// Configuration de la liaison entre Github et NextAuth en utilisant les .env
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';


// NextJS va utiliser ce Handler pour passer les credentials via la requête et NextAuth s'occupera de l'authentification.
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;


// Configuration pour NextAuth
// https://next-auth.js.org/configuration/options#providers
const options = {
  providers: [ // Tableau de providers pour se connecter sur la plateforme que l'on met (ici Github mais on peut en mettre d'autre)
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma), // Sert à faire persister le les données de connexion.
  secret: process.env.SECRET,
};