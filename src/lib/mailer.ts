// lib/mailer.ts
import "dotenv/config";
import { Resend } from "resend";

if (process.env.RESEND_API_KEY) {
}

const resend = new Resend(process.env.RESEND_API_KEY);

const verifiedSender = "Acme <onboarding@resend.dev>";

export async function sendPasswordResetEmail(email: string, url: string) {
  await resend.emails.send({
    from: verifiedSender,
    to: email,
    subject: "Reset your password",
    html: `<p>Click to reset password:</p><a href="${url}">${url}</a>`,
  });
}
