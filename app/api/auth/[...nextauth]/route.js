import NextAuth from "@node_modules/next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDatabase();
        console.log(profile.name.replace(" ", "").toLowerCase());

        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(...Usererror);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
