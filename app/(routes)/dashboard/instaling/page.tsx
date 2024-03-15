import { MainNav } from "@/app/(routes)/dashboard/_components/main-nav";
import { instalingUser } from "@/lib/instaling";
import Test from "./_components/test";

const DashboardPage = async () => {
  const user = await instalingUser();

  return (
    <>
      <div className="flex flex-col text-[#37474f]">
        <MainNav />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex w-full items-center justify-between space-y-2 sm:w-fit">
            <h2
              className="mx-auto text-center text-3xl font-bold tracking-tight sm:text-left"
              data-aos="fade-right"
            >
              Sekcja Instaling
            </h2>
          </div>
          <Test />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
