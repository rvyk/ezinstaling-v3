import icon from "@/app/favicon.ico";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent pt-36">
      <div className="mx-auto w-full max-w-screen-xl p-4 lg:py-6">
        <div className="grid place-items-center">
          <div>
            <a href="/" className="flex items-center">
              <Image src={icon} alt="ezInstaling" width={64} height={64} />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-900">
                awfulworld
              </span>
            </a>
          </div>
        </div>
        <hr className="mb-6 border-gray-200 sm:mx-auto" />
        <div className="grid place-items-center">
          <span className="text-center text-sm text-gray-500 ">
            © 2024{" "}
            <a href="/" className="hover:underline">
              awfulworld
            </a>{" "}
            is in no way affiliated with Insta.Ling Sp. z o.o.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
