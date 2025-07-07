// app/layout.tsx
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { SummaryProvider } from "@/context/SummaryContext";

export const metadata = {
  title: "Toku",
  description: "AI-Powered PDF Summarizer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SummaryProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            {children}
          </div>
        </SummaryProvider>
      </body>
    </html>
  );
}
