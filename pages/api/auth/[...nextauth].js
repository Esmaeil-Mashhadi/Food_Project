import CredentialsProvider from "next-auth/providers/credentials";

import foodUser from "@/models/userModel";
import connectDB from "@/helpers/connectDB";
import { verifyPassword } from "@/helpers/apiFunctions";
import NextAuth from "next-auth/next";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in connecting to DB!");
        }

        if (!email || !password) {
          throw new Error("Invalid Data!");
        }
        const user = await foodUser.findOne({ email: email });

        if (!user) throw new Error("User doesn't exist!");

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) throw new Error("Username or password is incorrect!");

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);