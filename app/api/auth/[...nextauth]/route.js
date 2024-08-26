import NextAuth from "next-auth";
import { connectToDB } from "@utils/database";
import User from "@models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "userName", type: "text" },
        // email: { label: "Email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        try {
          const user = await User.findOne({ userName: credentials.name });
          if (!user) {
            throw new Error("No user with this username is present");
          }
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("Invalid password.");
          }
          return { id: user._id.toString(), name: user.userName };
        } catch (error) {
          console.log("Error in authorization: ", error.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  strategy: "jwt",
  callbacks: {
    //this jwt callback is called everytime the token is create or updated. Here after successful creation and return of the user object in authorize function,
    //then this jwt callback is immediately run to create the token(which can contain some initial data or be empty) by adding user id in it
    async jwt({ token, account, user }) {
      if (user) {
        //since user here contains the user object returned from the above asuthorize function, so we have uses user.id, not user._id
        token.id = user.id;
        token.name = user.name;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    //after this creation of token, now session callback is done to create a session. Here this initial session object also contains basic info, and now we are customising it.
    async session({ token, session }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
