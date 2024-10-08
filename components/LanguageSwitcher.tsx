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

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // Establece el idioma según la ruta actual al cargar el componente
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'es' || segments[0] === 'en') {
      setSelectedLanguage(segments[0]);
    }
  }, [pathname]);

  const changeLanguage = (lang: string) => {
    const segments = pathname.split('/').filter(Boolean);

    // Reemplaza el prefijo del idioma o agrega uno si no existe
    if (segments[0] === 'en' || segments[0] === 'es') {
      segments[0] = lang;
    } else {
      segments.unshift(lang);
    }

    // Genera la nueva ruta con el idioma actualizado
    const newPath = `/${segments.join('/')}`;
    router.push(newPath, newPath, { locale: lang });  // Agrega { locale: lang }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          {selectedLanguage === "es" ? "Español" : "English"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={(lang) => {
            setSelectedLanguage(lang);
            changeLanguage(lang);  // Cambia el idioma cuando se selecciona
          }}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="es">
            <span>Español</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="en">
            <span>English</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
