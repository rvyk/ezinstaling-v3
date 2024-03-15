import Title from "@/components/_typography/title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const FAQ: React.FC = () => {
  const faq = [
    {
      name: "Czy dostanę blokadę od Instaling?",
      description:
        "Nie. Nasza usługa została przetestowana przez kilkudziesięciu użytkowników i nie otrzymaliśmy żadnych zgłoszeń dotyczących blokowania przez Instaling. Nasz kod emuluje działanie przeglądarki internetowej. Wysyłamy odpowiednie zapytania sekwencyjnie, aby jak najwiarygodniej naśladować działania użytkownika.",
    },
    {
      name: "Znalazłem błąd, co z nim zrobić?",
      description:
        "W przypadku znalezienia błędu w naszym serwisie, prosimy o niezwłoczne powiadomienie nas na naszym serwerze Discord lub tutaj. Jeżeli nie otrzymamy takiej informacji, a wykryjemy podejrzane ruchy, możemy zadecydować o zablokowaniu użytkownika. Zapewniamy, że takie decyzje podejmujemy w celu utrzymania bezpieczeństwa i prawidłowego funkcjonowania naszego serwisu.",
    },
  ];
  return (
    <section className="pt-48" id="faq">
      <div className="container mx-auto grid h-full grid-rows-2 gap-24 px-8 lg:grid-cols-2 lg:grid-rows-none">
        <div className="grid h-fit gap-4 lg:gap-8">
          <h1
            data-aos="fade-up"
            data-aos-delay="400"
            className="w-fit text-center text-4xl font-semibold text-[#37474f] drop-shadow-md lg:text-5xl"
          >
            FAQ
          </h1>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem
                data-aos="fade-right"
                data-aos-delay={index * 100}
                key={index}
                value={`item-${index}`}
                className="border-b border-[#54575b]/20"
              >
                <AccordionTrigger className="text-base text-[#54575b] transition-all hover:text-[#54575b]/85 lg:text-xl">
                  {item.name}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-medium text-[#54575b]/70 lg:text-base">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="grid h-fit justify-center gap-4">
          <Title
            title="Nie znalazłeś odpowiedzi na swoje pytanie?"
            desc="Dołącz do naszego serwera Discord i tam możesz zadać nam pytanie!"
            className="!text-3xl lg:!text-4xl"
          />
          <Button
            data-aos="fade-up"
            data-aos-delay="600"
            size="lg"
            className="mx-auto w-fit font-semibold"
            asChild
          >
            <Link href="https://dc.ezinstaling.pl/">
              <DiscordLogoIcon className="mr-2 h-6 w-6" /> Discord
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
