import FooterPublic from '@/components/layouts/public/footer';
import MenuPublic from '@/components/layouts/public/nav';
import FooterPrivate from '@/components/layouts/private/footer';
import MenuPrivate from '@/components/layouts/private/nav';
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import { createClient } from '@/utils/supabase/server'; 
import { metadata as siteMetadata } from './metadata';

export const metadata = siteMetadata;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  const locale = params.lang || 'en';  // Manejamos el idioma aquí

  return (
    <html lang={locale} className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-right" />
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              {user ? <MenuPrivate data={user} /> : <MenuPublic />}
              <div className="container mx-auto">
                {children}
              </div>
              {user ? <FooterPrivate /> : <FooterPublic />}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}