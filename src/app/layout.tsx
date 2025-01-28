import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "sonner";

const fontTitle = Inter({
    variable: "--font-title",
    subsets: ["latin"],
});

const fontSans = Inter_Tight({
    variable: "--font-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Comape",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR " suppressHydrationWarning>
            <body className={cn(fontTitle.variable, fontSans.variable)}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Toaster expand />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
