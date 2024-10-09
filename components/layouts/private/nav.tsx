"use client";

import { Link } from "@/navigation";
import Logo from '@/components/logo';
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/[locale]/actions";
import { ThemeSwitcher } from "@/components/theme-switcher";
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface NavProps {
  data: {
    email: string;
  } | null;
}

export default function Nav({ data }: NavProps) {
  const { locale } = useParams();
  const t = useTranslations("Nav");

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
        <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {t("greeting")}, {data?.email}!
          <form action={() => signOutAction(locale)}>
            <Button type="submit" variant={"outline"}>
              {t("signOut")}
            </Button>
          </form>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
