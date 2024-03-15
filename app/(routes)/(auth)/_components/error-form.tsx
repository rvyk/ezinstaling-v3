import { FormError } from "@/app/(routes)/(auth)/_components/ui/form-error";
import Title from "@/components/_typography/title";
import Link from "next/link";

export const ErrorForm = () => {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto grid h-full place-items-center gap-10 px-8">
        <Title title="Problem z logowaniem" />

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mx-auto w-full rounded-[20px] bg-white px-6 py-8 shadow-[0px_3px_12px_0px_#D7DDFC] lg:w-1/2"
        >
          <FormError message="Wystąpił nieokreślony błąd podczas logowania" />
        </div>
        <Link
          className="mb-5 text-xs font-medium text-[#54575b]"
          href="https://dc.ezinstaling.pl/"
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-offset={-500}
        >
          Zgłoś ten błąd do nas{" "}
          <span className="font-bold text-[#3452fe] hover:text-[#3452fe]/90">
            na discordzie!
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ErrorForm;
