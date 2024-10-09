"use client";

import Hero from "@/components/hero";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Index() {
  
  // server request async stuff
  const t = useTranslations("Homepage")

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("content")}</p>
      <Hero />
    </div>
  );
}