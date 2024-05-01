import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/app/[locale]/theme-provider";
import {UserProvider} from "@auth0/nextjs-auth0/client";
import {NextIntlClientProvider, useMessages} from "next-intl";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "UN-Habitat CoP Platform",
    description: "Collaboration Platform for UN-Habitat Communities of Practice",
};

export default function RootLayout({
                                       children,
                                       params: {locale}
                                   }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    const messages = useMessages();
    return (
        <html lang={locale} className="h-full bg-gray-50">
        <body className="dark:bg-gray-950">
        <UserProvider profileUrl="/api/auth/me">
            <ThemeProvider attribute="class" defaultTheme="system">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </ThemeProvider>
        </UserProvider>
        </body>
        </html>
    );
}
