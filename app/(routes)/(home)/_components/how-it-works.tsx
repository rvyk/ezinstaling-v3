import Title from "@/components/_typography/title";

const HowItWorks: React.FC = () => {
  const content = [
    {
      title: "1",
      text: (
        <>
          Pobierany{" "}
          <span className="font-semibold text-[#37474f]/85">
            Twoje dane logowania Instaling{" "}
          </span>
          oraz walidujemy ich poprawność
        </>
      ),
    },
    {
      title: "2",
      text: (
        <>
          Sprawdzamy, czy nie wykonujesz już u nas sesji{" "}
          <span className="font-semibold text-[#37474f]/85">Instaling</span>
        </>
      ),
    },
    {
      title: "3",
      text: (
        <>
          Jeżeli korzystasz z wersji{" "}
          <span className="inline-block bg-gradient-to-r from-[#fa9d00] to-[#fbc15c] bg-clip-text font-bold text-transparent">
            premium
          </span>{" "}
          naszego rozwiązania, automatycznie inicjalizujemy sesję z wybranymi
          opcjami. W przypadku braku wersji{" "}
          <span className="inline-block bg-gradient-to-r from-[#fa9d00] to-[#fbc15c] bg-clip-text font-bold text-transparent">
            premium
          </span>
          , używamy domyślnych ustawień
        </>
      ),
    },
    {
      title: "4",
      text: (
        <>
          Rozpoczynamy rozwiązywanie Twojej sesji{" "}
          <span className="font-semibold text-[#37474f]/85">Instaling</span>
        </>
      ),
    },
  ];
  return (
    <section className="pt-24" id="how-it-works">
      <div className="container mx-auto grid h-full place-items-center gap-16 px-8">
        <Title
          title="Jak to działa?"
          desc=<>
            {" "}
            Dowiedz się w jaki sposób wykonujemy&nbsp;
            <span className="font-semibold text-[#565656]">
              Twoją sesję Instaling&nbsp;
            </span>
            - jest to bardzo proste!
          </>
        />
        <div className="grid w-full grid-rows-8 items-center justify-center gap-8 text-center lg:grid-cols-2 lg:grid-rows-4">
          {content.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
              className="row-span-2 grid h-full gap-4 rounded-[20px] bg-[#fff] px-6 py-8 shadow-[0px_3px_12px_0px_#D7DDFC]"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[15px] bg-[#3949ab] shadow-[0px_3px_12px_0px_#D7DDFC]">
                <h1 className="text-4xl font-semibold text-[#fff]">
                  {item.title}
                </h1>
              </div>
              <p className="text-sm font-medium text-[#37474f]/80 lg:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
