import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import DE from "@/media/DE.svg";
import ES from "@/media/ES.svg";
import FR from "@/media/FR.svg";
import GB from "@/media/GB.svg";
import instalingLogo from "@/media/InstaLing_face.svg";
import PL from "@/media/PL.svg";
import { ArrowRightIcon, CaretDownIcon } from "@radix-ui/react-icons";

const Hero: React.FC = () => {
  const languagesLogo = [
    { name: "DE", logo: DE },
    { name: "ES", logo: ES },
    { name: "FR", logo: FR },
    { name: "GB", logo: GB },
    { name: "PL", logo: PL },
  ];

  return (
    <header className="glow:bg-[#fafafa]/5 relative h-screen min-h-screen w-full">
      <div className="container relative z-20 mx-auto mt-4 h-full px-6 lg:mt-0">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div
            data-aos="fade-down"
            className="absolute right-24 top-36 hidden h-44 w-44 xl:block"
          >
            <Image
              src={instalingLogo}
              alt="instaling face logo"
              className=" rotate-12"
            />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {languagesLogo.map((lang, i) => (
              <div
                data-aos="fade-up"
                data-aos-delay={i * 100}
                key={i}
                className="rounded-full bg-white p-[1px] shadow-[0px_3px_12px_0px_#D7DDFC]"
              >
                <Image src={lang.logo} alt={lang.name} width={40} height={40} />
              </div>
            ))}
          </div>
          <h1
            data-aos="fade-up"
            className="my-2 text-[2.5rem] font-bold leading-10 text-[#37474f] lg:text-6xl"
          >
            Bot
            <span className="underlined inline-block bg-gradient-to-r from-[#3452fe] to-[#5069fa] bg-clip-text py-2 text-transparent">
              AI
            </span>
            do wykonywania <br /> sesji{" "}
            <span className="inline-block bg-gradient-to-r from-[#fa9d00] to-[#fbc15c] bg-clip-text py-2 text-transparent">
              Instaling
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="250"
            className="my-2 w-[95%] text-sm text-[#54575b] opacity-85 lg:w-[80%] lg:text-lg"
          >
            Ręczne rozwiązanie sesji Instaling zajmuje ok.{" "}
            <span className="font-semibold text-[#565656]">5 minut</span>. Teraz
            wykonasz ją za pomocą jednego kliknięcia lub możesz skorzystać z
            naszej oferty{" "}
            <span className="font-semibold text-[#565656]">
              automatycznego wykonania sesji
            </span>
            , oszczędzając cenny czas. Wybierz najwygodniejszą{" "}
            <span className="font-semibold text-[#565656]">dla Ciebie</span>{" "}
            opcję!
          </p>

          <div className="my-3.5 grid w-fit grid-rows-2 items-center gap-6 lg:grid-cols-2 lg:grid-rows-none lg:gap-9">
            <Button
              className="font-semibold"
              variant="instaling"
              size="lg"
              data-aos="fade-right"
              data-aos-offset={-500}
              asChild
            >
              <Link href="/#offer">NASZA OFERTA</Link>
            </Button>
            <Link
              href="/login"
              data-aos="fade-left"
              data-aos-offset={-500}
              className="font-semibold uppercase text-[#3452fe] hover:text-[#3452fe]/80"
            >
              ZALOGUJ SIĘ <ArrowRightIcon className="inline-block h-5 w-5" />
            </Link>
          </div>
          <CaretDownIcon
            className="absolute top-[85%] h-6 w-6 animate-bounce text-[#3452fe]"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-offset={-500}
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
