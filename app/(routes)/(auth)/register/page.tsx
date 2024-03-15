import RegisterForm from "@/app/(routes)/(auth)/_components/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Dołącz do ezInstaling.pl - Zarejestruj się i zyskaj pełen dostęp do narzędzi edukacyjnych!",
  description:
    "Dołącz do społeczności ezInstaling.pl już dziś! Zarejestruj się, aby skorzystać z bezpłatnego bota AI do sesji oraz innych przydatnych narzędzi edukacyjnych.",
};

const Page = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default Page;
