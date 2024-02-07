import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/app/theme-provider";
import {UserProvider} from "@auth0/nextjs-auth0/client";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "UN-Habitat CoP Platform",
    description: "Collaboration Platform for UN-Habitat Communities of Practice",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full bg-white">
        <body className="dark:bg-gray-950">
        <UserProvider profileUrl="/api/auth/me">
            <ThemeProvider attribute="class" defaultTheme="system">
                {children}
            </ThemeProvider>
        </UserProvider>
        </body>
        </html>
    );
}
