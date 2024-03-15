"use client";

import useVisibility from "@/hooks/useVisibility";
import { useState } from "react";
import CountUp from "react-countup";

const Numbers: React.FC = () => {
  const [isTriggered, setIsTriggered] = useState(false);

  const numbers = [
    {
      name: (
        <>
          Wykonanych <br /> sesji
        </>
      ),
      value: 1821,
    },
    {
      name: (
        <>
          Uzupełnionych <br /> słówek
        </>
      ),
      value: 38807,
    },
    {
      name: "Użytkowników",
      value: 122,
    },
  ];

  const sectionRef = useVisibility(
    () => setIsTriggered(true),
    () => {},
  );

  return (
    <section className="relative z-20 bg-transparent">
      <div
        ref={sectionRef}
        className="container mx-auto flex h-full w-full py-8"
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-6 lg:grid lg:grid-cols-3">
          {numbers.map((number, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="mx-auto flex w-full flex-col items-center justify-center rounded-[20px] bg-[#3949ab] px-16 py-4 shadow-[0px_3px_12px_0px_#D7DDFC] lg:h-full lg:w-3/4"
            >
              <span className="inline-block bg-gradient-to-r from-[#fff] to-[#fafafa] bg-clip-text py-2 text-5xl font-bold text-transparent">
                {isTriggered ? <CountUp end={number.value} duration={3} /> : 0}
              </span>

              <h3
                data-aos="fade-up"
                data-aos-delay={500 + index * 100}
                className="text-center text-sm font-medium text-[#fff]/80 lg:text-base"
              >
                {number.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Numbers;
