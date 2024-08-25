import NextAuth from "next-auth";
import { connectToDB } from "@utils/database";
import User from "@models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { hash, compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        try {
          console.log("Authorize function called with:", credentials);
          
          if (credentials.signup) {
            //for Signup
            const isUser = await User.findOne({ email: credentials.email });
            if (isUser) {
              console.log("User is already present");
              throw new Error("User already exists");
            }
            const hashedPassword = await hash(credentials.password, 10);
            const newUser = await User.create({
              email: credentials.email,
              username: credentials.name.replace(" ", "").toLowerCase(),
              password: hashedPassword,
            });
            return newUser;
          } else {
            //for Login
            const user = await User.findOne({ email: credentials.email });
            if (!user) {
              console.log("Please sign up");
              return null;
            }
            const isValid = await compare(
              user.password,
              credentials.password
            );
            if (!isValid) {
              console.log("Please enter correct password");
              return null;
            }
             return { id: user._id, email: user.email, username: user.username };;
          }
        } catch (error) {
          console.log("Error in authorization: ", error.message);
          return false;
        }
      },
    }),
  ],
 
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
        session.user.username = sessionUser.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
