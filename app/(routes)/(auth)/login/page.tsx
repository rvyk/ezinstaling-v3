import LoginForm from "@/app/(routes)/(auth)/_components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Zaloguj się na ezInstaling.pl i korzystaj z bezpłatnych rozwiązań sesji!",
  description:
    "Zaloguj się bezpiecznie na ezInstaling.pl i zacznij efektywne rozwiązywanie sesji. Dostęp do najlepszego bota AI i narzędzi edukacyjnych. Łatwo, szybko, skutecznie!",
};

const Page = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default Page;
