"use client";

import { signInAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Login({ searchParams }: { searchParams: Message }) {
  const { locale } = useParams();
  const t = useTranslations("Login"); // Accedemos a las traducciones del archivo Login

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto">
      <h1 className="text-2xl font-medium">{t("title")}</h1> {/* Traducción del título */}
      <p className="text-sm text-foreground">
        {t("noAccount")}{" "}
        <Link className="text-foreground font-medium underline" href={`/${locale}/sign-up`}>
          {t("signUp")}
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">{t("emailLabel")}</Label> {/* Traducción de la etiqueta del email */}
        <Input name="email" placeholder={t("emailPlaceholder")} required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">{t("passwordLabel")}</Label>
          <Link
            className="text-xs text-foreground underline"
            href={`/${locale}/forgot-password`}
          >
            {t("forgotPassword")}
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder={t("passwordPlaceholder")}
          required
        />
        {/* Aquí pasamos el locale como argumento al formAction */}
        <SubmitButton pendingText={t("pendingText")} formAction={(formData) => signInAction(formData, locale)}>
          {t("submitButton")}
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
