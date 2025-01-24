import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
      
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
      
        if (!response.ok) return null;
      
        return { id: "1", username: credentials.username };
      },
      
    }),
  ],
  pages: {
    signIn: "/auth/signin", 
  },
};

export default NextAuth(authOptions);
