import NextAuth, { type NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import axios from 'axios'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user) return false
      try {
        await axios.post(`${process.env.BACKEND_URL}/users`, {
          email: user.email,
          name: user.name,
          avatar: user.image,
          github_id: user.id,
        })
      } catch (error) {
        console.error({ error })
      }

      return true
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

export default NextAuth(authOptions)
