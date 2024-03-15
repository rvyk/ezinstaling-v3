"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

import icon from "@/app/favicon.ico";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { data: session } = useSession();

  React.useEffect(() => {
    addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const pathname = usePathname();

  const loginButton = {
    redirect: session
      ? "/dashboard"
      : pathname === "/login"
        ? "/register"
        : "/login",
    text: session
      ? "Przejdź do panelu"
      : pathname === "/login"
        ? "Zarejestruj się"
        : "Zaloguj się",
  };

  const links = [
    {
      name: "ezInstaling",
      items: [
        {
          title: "Jak to działa?",
          description: "Dowiedz się jak to działa",
          link: "/#how-it-works",
        },

        {
          title: "FAQ",
          description: "Często zadawane pytania",
          link: "/#faq",
        },
      ],
    },
    {
      name: "Nasza oferta",
      link: "/#offer",
    },
    {
      name: "Discord",
      link: "https://dc.ezinstaling.pl/",
    },
    {
      name: "Status",
      link: "https://status.ezinstaling.lol",
    },
  ];
  return (
    <nav
      className={`${isScrolled && "!top-0 bg-[#fff] py-2 lg:py-4"} fixed left-0 right-0 top-4 z-50 w-full transition-all lg:top-8`}
    >
      <div className="container grid w-full grid-cols-12 items-center justify-center">
        <Link href="/" className="col-span-3 flex justify-start">
          <Image
            data-aos="fade-right"
            data-aos-delay="100"
            src={icon}
            alt="ezInstaling"
            width={64}
            height={64}
          />
        </Link>
        <NavigationMenu className="col-span-6 mx-auto hidden justify-center lg:flex">
          <NavigationMenuList>
            {links.map((link, index) => {
              if (link.items) {
                return (
                  <NavigationMenuItem key={index} className="px-6">
                    <NavigationMenuTrigger
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="inline-flex items-center text-sm font-semibold text-[#3452fe] hover:text-[#3452fe]/80"
                    >
                      {link.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {link.items.map((item) => (
                          <ListItem
                            href={item.link}
                            title={item.title}
                            key={item.title}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }
              return (
                <NavigationMenuItem
                  key={index}
                  className="px-6"
                  data-aos="fade-up"
                  data-aos-delay={index * 100 + 100}
                >
                  <NavigationMenuLink
                    href={link.link}
                    className="text-sm font-semibold text-[#3f4e56] hover:text-[#3452fe]/80"
                  >
                    {link.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="col-span-9 flex justify-end lg:col-span-3">
          <Button
            data-aos="fade-left"
            data-aos-delay="200"
            size="lg"
            className="w-auto font-semibold"
            asChild
          >
            <Link href={loginButton.redirect}>{loginButton.text}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-[8px] bg-[#e8eaf6] p-3 leading-none text-[#3452fe] no-underline outline-none transition-colors hover:bg-[#e8eaf6]/70 hover:text-[#3452fe]/80",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
