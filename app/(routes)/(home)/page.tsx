import FAQ from "@/app/(routes)/(home)/_components/faq";
import Hero from "@/app/(routes)/(home)/_components/hero";
import HowItWorks from "@/app/(routes)/(home)/_components/how-it-works";
import Numbers from "@/app/(routes)/(home)/_components/numbers";
import OurOffer from "@/app/(routes)/(home)/_components/our-offer";
import Footer from "@/components/_global/footer";
import Navbar from "@/components/_global/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Darmowy bot AI do sesji Instaling.pl - Twój klucz do sukcesu na ezInstaling.pl",
  description:
    "Odkryj unikalne rozwiązania na Instaling.pl! Rozwiązuj sesje bez instalacji dodatkowych programów na swoim komputerze. Wykorzystujemy sztuczną inteligencję, zapewniając uczciwe rezultaty. Sprawdź nasze narzędzia edukacyjne dla Testportal, Quizziz i Kahoot.",
};

const Page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Numbers />
      <HowItWorks />
      <FAQ />
      <OurOffer />
      <Footer />
    </>
  );
};

export default Page;
