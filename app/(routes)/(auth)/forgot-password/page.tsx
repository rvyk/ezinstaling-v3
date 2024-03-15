import ForgotPasswordForm from "@/app/(routes)/(auth)/_components/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Zapomniałeś hasła? Bez obaw! Przywróć dostęp do ezInstaling.pl w kilku prostych krokach!",
  description:
    "Zapomniałeś hasła do ezInstaling.pl? Spokojnie! Przywróć dostęp szybko i łatwo, odzyskując kontrolę nad swoim kontem edukacyjnym.",
};

const Page = () => {
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
};

export default Page;
