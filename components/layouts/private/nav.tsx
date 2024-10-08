"use client";

import Link from "next/link";
import Logo from '@/components/logo';
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/actions";
import { ThemeSwitcher } from "@/components/theme-switcher";
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface NavProps {
  data: {
    email: string;
    // Add more user fields here if needed
  } | null; // Handle the case where data can be null
}

export default function Nav({ data }: NavProps) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href="/">
            <Logo />
          </Link>
        </div>

          <div className="flex items-center gap-4">
            Hey, {data.email}!
            <form action={signOutAction}>
              <Button type="submit" variant={"outline"}>
                Sign out
              </Button>
            </form>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          

      </div>
    </nav>
  );
}
