import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { hash as bcryptHash, compare as bcryptCompare } from "bcryptjs";
import { sendPasswordResetEmail } from "./mailer";
// import { sendPasswordResetEmail } from "./lib/mailer";

// setting the roles
const adminRole = "admin";
const userRole = "user";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: true,
    minPasswordLength: 4,
    maxPasswordLength: 128,
    autoSignIn: true,
    resetPasswordTokenExpiresIn: 3600, // 1 hour

    sendResetPassword: async ({ user, url, token }) => {
      console.log(`Reset email for ${user.email}: ${url}`);
      await sendPasswordResetEmail(user.email, url);
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
  emailVerification: {
    sendOnSignUp: true, // send verification email automatically on signup
    autoSignInAfterVerification: true, // sign in user after they verify

    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // verified sender
        to: user.email,
        subject: "Email Verification",
        html: `Click the link to verify your email: <a href="${url}">${url}</a>`,
      });
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
