const domain = process.env.NEXT_PUBLIC_DOMAIN;
import { ResetPassword } from "@/components/templates/reset-password";
import { EmailVerify } from "@/components/templates/verify-email";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SENDER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER_LOGIN,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
});

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string,
) => {
  const confirmLink = `${domain}/auth/verify?token=${token}`;

  const emailHTML = render(
    <EmailVerify user={name} verificationLink={confirmLink} />,
    {
      pretty: true,
    },
  );

  await transporter.sendMail({
    from: "noreply@ezinstaling.pl",
    to: email,
    subject: `Potwierdź swój adres e-mail`,
    html: emailHTML,
  });
};

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  const emailHTML = render(
    <ResetPassword user={name} resetLink={resetLink} />,
    {
      pretty: true,
    },
  );

  await transporter.sendMail({
    from: "noreply@ezinstaling.pl",
    to: email,
    subject: `Zresetuj swoje hasło`,
    html: emailHTML,
  });
};
