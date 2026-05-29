import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { cookies } from "next/headers";
import { JWTService } from "@/lib/security/jwt";
import { Navbar } from "@/components/organisms/layout/Navbar";
import { AuthProvider } from "@/components/providers/auth-provider";
import { PageTransition } from "@/components/ui/PageTransition";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GIIN | Global Impact Innovation Network",
  description: "Enterprise platform for the Global Impact Innovation Network",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check auth state server-side
  const cookieStore = await cookies();
  const token = cookieStore.get("next-auth.session-token");
  let user = null;

  if (token) {
    const payload = await JWTService.verify(token.value);
    if (payload) {
      user = {
        email: payload.email as string,
        role: payload.role as string,
      };
    }
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        <AuthProvider user={user}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar user={user} />
            <PageTransition>{children}</PageTransition>
          </ThemeProvider>
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
