import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ErrorDB — Programming Error Messages Explained",
  description:
    "Searchable database of programming error messages. Plain-English explanations, common causes, and working fixes for JavaScript, TypeScript, Python, Node.js, React, Java, Go, Rust, Git, Docker, SQL, and more.",
  openGraph: {
    title: "ErrorDB — Programming Error Messages Explained",
    description:
      "Plain-English explanations, causes, and fixes for programming errors across JavaScript, TypeScript, Python, Node.js, React, Java, Go, Rust, Git, Docker, SQL, and more.",
    siteName: "ErrorDB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ErrorDB — Programming Error Messages Explained",
    description:
      "Searchable database of programming error messages with plain-English explanations and working fixes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 antialiased min-h-screen">
        <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-red-400 text-2xl font-mono font-bold">⚠</span>
              <span className="text-xl font-bold">
                Error<span className="text-red-400">DB</span>
              </span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-gray-200 transition-colors">
                All Errors
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500">
            ErrorDB — Programming error messages explained. Built autonomously by an AI agent as a 30-day experiment.
          </div>
        </footer>
      </body>
    </html>
  );
}
