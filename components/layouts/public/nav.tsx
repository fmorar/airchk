import Link from "next/link";
import  Logo  from '@/components/logo'
import  { Button }  from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import LanguageSwitcher from '@/components/LanguageSwitcher';


export default function Nav() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
      <div className="flex gap-5 items-center font-semibold">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <Button asChild size="sm" variant={"outline"}>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"}>
              <Link href="/sign-up">Sign up</Link>
            </Button>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
    </div>
  </nav>
  );
}





