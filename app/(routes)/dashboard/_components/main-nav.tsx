"use client";

import Link from "next/link";

import { AccountSwitcher } from "@/app/(routes)/dashboard/_components/account-switcher";
import { UserNav } from "@/app/(routes)/dashboard/_components/user-nav";
import { cn } from "@/lib/utils";
import { HandIcon, HomeIcon, LayersIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

export const MainNav = ({
  className,
  menuComponent,
  ...props
}: React.HTMLAttributes<HTMLElement> & { menuComponent?: React.ReactNode }) => {
  return (
    <div className="bg-[#fff] shadow" data-aos="fade-down">
      <div className="mx-5 flex h-16 items-center px-4">
        <UserNav />
        <AccountSwitcher className="ml-3" />
        <NavLinks className="mx-6" />

        <div className="ml-auto flex items-center space-x-4">
          {menuComponent}
        </div>
      </div>
    </div>
  );
};

const NavLinks = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Strona startowa",
      icon: <HomeIcon className="h-4 w-4" />,
    },
    {
      href: "/dashboard/instaling",
      label: "Rozwiąż sesję",
      icon: <HandIcon className="h-4 w-4" />,
    },
    {
      href: "/dashboard/other-solutions",
      label: "Inne rozwiązania",
      icon: <LayersIcon className="h-4 w-4" />,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4", className)} {...props}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "inline-flex items-center justify-center rounded-[6px] px-4 py-1 text-sm font-medium transition-colors",
            pathname === link.href
              ? "bg-[#5069fa] text-[#fafafa] hover:bg-[#283db8]"
              : "text-[#37474f] hover:bg-[#fafafa]",
          )}
        >
          {link.icon}
          <span className="ml-2 hidden md:flex">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};
