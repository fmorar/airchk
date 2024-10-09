import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import FooterPublic from '@/components/layouts/public/footer';
import MenuPublic from '@/components/layouts/public/nav';
import FooterPrivate from '@/components/layouts/private/footer';
import MenuPrivate from '@/components/layouts/private/nav';
import { GeistSans } from "geist/font/sans";
import { Toaster } from 'react-hot-toast';
import { createClient } from '@/utils/supabase/server'; 
import { metadata as siteMetadata } from './metadata';


export const metadata = siteMetadata;


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const messages = await getMessages()
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <NextIntlClientProvider messages={messages}>
      <html lang="en" className={GeistSans.className}>
        <body className="bg-background text-foreground">
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
        </body>
      </html>
    </NextIntlClientProvider>
  )
}