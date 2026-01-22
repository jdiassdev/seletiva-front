import "./globals.css";
import Navbar from "../components/layout/NavBar";

export const metadata = {
  title: "BO7EN - Aplicação fullstack",
  description: "Aplicação fullstack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="">
          <Navbar />
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
