"use client";

import { useTranslation } from 'react-i18next';
import Hero from "@/components/hero";
import Loader from "@/components/Loader";
import '../lib/i18n';


export default function Index() {
  const { t, ready } = useTranslation('common');  // Usamos `common` como namespace

  if (!ready) {
    return <Loader className="h-screen" />;
  }

  return (
    <>
      <Hero />
      <h1>{t('welcome')}</h1> 
      <p>{t('description')}</p>
    </>
  );
}
