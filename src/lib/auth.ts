import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { hash as bcryptHash, compare as bcryptCompare } from "bcryptjs";
// import { sendPasswordResetEmail } from "./lib/mailer";

// setting the roles
const adminRole = "admin";
const userRole = "user";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    resetPasswordTokenExpiresIn: 3600, // 1 hour

    sendResetPassword: async ({ user, url, token }) => {
      console.log(`Reset email for ${user.email}: ${url}`);
      // await sendPasswordResetEmail(user.email, url);
    },

    password: {
      hash: async (password: string) => {
        const hashedPassword = await bcryptHash(password, 10);
        return hashedPassword;
      },
      verify: async ({
        hash,
        password,
      }: {
        hash: string;
        password: string;
      }) => {
        const isValid = await bcryptCompare(password, hash);
        return isValid;
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: userRole,
        };
      },
    },
  },

  plugins: [
    admin({
      adminRoles: [adminRole],
      defaultRole: userRole,
    }),
    nextCookies(),
  ],
});
