import "@/app/(routes)/(auth)/auth.css";
import Footer from "@/components/_global/footer";
import Navbar from "@/components/_global/navbar";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AuthLayout;
