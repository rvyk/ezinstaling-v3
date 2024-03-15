import { cn } from "@/lib/utils";

const Title = ({
  title,
  desc,
  className,
}: {
  title: string;
  desc?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        className,
        "grid items-center justify-center text-center text-4xl lg:text-5xl",
      )}
    >
      <h1
        data-aos="fade-up"
        data-aos-delay="300"
        className="font-semibold text-[#37474f] drop-shadow-md"
      >
        {title.split(" ").map((word, index) => {
          if (index === title.split(" ").length - 1) {
            return (
              <span
                key={index}
                className="underlined inline-block bg-gradient-to-r from-[#3452fe] to-[#5069fa] bg-clip-text py-2 text-transparent"
              >
                {word}
              </span>
            );
          } else {
            return word + " ";
          }
        })}
      </h1>
      {desc && (
        <p
          data-aos="fade-up"
          data-aos-delay="500"
          className="mx-auto mt-2 w-[95%] text-center text-sm text-[#54575b] lg:w-[80%] lg:text-base"
        >
          {desc}
        </p>
      )}
    </div>
  );
};

export default Title;
