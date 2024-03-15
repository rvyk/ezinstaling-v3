import { ArrowRightIcon } from "@radix-ui/react-icons";

import Offers from "@/app/(routes)/(home)/_components/offers";
import Title from "@/components/_typography/title";

const OurOffer: React.FC = () => {
  const features = [
    {
      title: "Brak reklam",
      description: "Brak uciążliwych reklam, tylko czysta efektywność.",
    },
    {
      title: "Uczciwy rozwiązujący",
      description:
        "Wszystkie sesje rozwiązane 20/20? Teraz to nie problem, dzięki opcji uczciwy rozwiązujący, która pozwala na dostosowania różnych pomyłek podczas wykonywania sesji.",
    },
    {
      title: "Automatyczne rozwiązywanie",
      description:
        "Oszczędź czas i energię dzięki funkcji automatycznego wykonywania sesji – to Twój osobisty asystent do szybkiego sukcesu.",
    },
    {
      title: "Wsparcie kilku kont",
      description:
        "Masz więcej niż jedno konto na Instaling? Nie ma problemu! ezInstaling Premium pozwala na dodanie kilku kont, dzięki czemu możesz korzystać z niego na każdym z nich.",
    },
  ];

  return (
    <section className="min-h-[700px] pt-48" id="offer">
      <div className="container mx-auto grid h-full place-items-center gap-12 px-8">
        <Title
          title="Nasza oferta"
          desc=<>
            Sprawdź naszą{" "}
            <span className="font-semibold text-[#565656]">ofertę!</span>
          </>
        />
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex w-full flex-col rounded-[20px] bg-[#fff] px-6 py-9 shadow-[0px_3px_12px_0px_#D7DDFC]"
        >
          <div className="flex w-full flex-col lg:flex-row">
            <div className="grid h-fit gap-3 lg:w-1/2">
              <h1
                data-aos="fade-right"
                data-aos-delay="400"
                className="inline-flex flex-col items-center text-2xl font-medium text-[#37474f] lg:flex-row lg:text-4xl"
              >
                Pakiet
                <span className="inline-block bg-gradient-to-r from-[#fa9d00] to-[#fbc15c] bg-clip-text font-semibold text-transparent lg:ml-2 lg:py-2">
                  Premium
                </span>
              </h1>
              <p
                data-aos="fade-right"
                data-aos-delay="450"
                className="pr-0 text-center text-sm font-medium text-[#37474f]/70 lg:pr-8 lg:text-left lg:text-base"
              >
                Witaj w ezInstaling Premium! Zapomnij o reklamach, a przywitaj
                się z łatwiejszym i szybszym rozwiązywaniem sesji na Instaling.
                To nie cheat, to sposób na bezstresową wygraną. Gotowy na nową
                jakość? Wybierz ezInstaling Premium! 🚀
              </p>
              <div className="mt-6 grid grid-rows-4 gap-5 lg:grid-cols-2 lg:grid-rows-2">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center"
                    data-aos="fade-right"
                    data-aos-delay={450 + index * 100}
                  >
                    <ArrowRightIcon className="mr-3 h-6 w-6 text-[#ffbc04]" />
                    <p
                      key={index}
                      className="text-sm font-medium text-[#37474f]/85 lg:text-base"
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 h-fit lg:mt-0 lg:w-1/2">
              <Offers />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurOffer;
