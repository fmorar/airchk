"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

const languages = {
  en: "English",
  es: "Español",
  fr: "Français"
};

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const lang = pathname.split('/')[1];
    if (languages[lang]) setSelectedLanguage(lang);
  }, [pathname]);

  const changeLanguage = (lang: string) => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = languages[segments[0]] ? lang : [lang, ...segments].join('/');
    router.push(`/${segments.join('/')}`, undefined, { locale: lang });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">{languages[selectedLanguage]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={(lang) => {
            setSelectedLanguage(lang);
            changeLanguage(lang);
          }}
        >
          {Object.entries(languages).map(([key, label]) => (
            <DropdownMenuRadioItem key={key} className="flex gap-2" value={key}>
              <span>{label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
