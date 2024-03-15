import { getProducts } from "@/actions/stripe/getProducts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const Offers: React.FC = async () => {
  const offers = (await getProducts()).ezInstalingPlans;

  if (!offers.length) return null;

  return (
    <Tabs defaultValue={offers[0]?.id} className="h-full w-full pb-3">
      <TabsList className="grid h-full w-full grid-rows-3 rounded-[14px] bg-[#fafafa] px-1.5 pt-0.5 lg:grid-cols-3 lg:grid-rows-none">
        {offers.map((offer, index) => (
          <TabsTrigger
            key={index}
            value={offer.id}
            data-aos="fade-up"
            data-aos-delay={450 + index * 100}
            className="w-full rounded-[10px] py-1.5 text-sm lg:text-base"
          >
            <>
              <span className="font-semibold">
                {offer.unit_amount / 100}zł &nbsp;
              </span>
              <span className="text-xs">/ {offer.clear_name}</span>
            </>
          </TabsTrigger>
        ))}
      </TabsList>

      {offers.map((offer, index) => (
        <TabsContent
          data-aos="fade-up"
          data-aos-delay="450"
          key={index}
          value={offer.id}
        >
          <div className="grid h-full gap-4 rounded-[14px] bg-[#fafafa] px-6 py-9">
            <h1 className="text-xl font-semibold text-[#37474f] lg:text-2xl">
              {offer.name}
            </h1>
            <p className="text-sm font-medium text-[#37474f]/70 lg:text-base">
              {offer.description}
            </p>

            <Button
              variant="instaling"
              size="lg"
              className="w-full lg:w-fit"
              asChild
            >
              <Link href="/login?callbackUrl=/dashboard?tab=upgrade">
                Kup pakiet premium
              </Link>
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Offers;
