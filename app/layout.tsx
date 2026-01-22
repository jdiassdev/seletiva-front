import "./globals.css";
import Navbar from "../components/layout/NavBar";
import { Toolbar } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <header className="">
        <Navbar />
      </header>
      <body>{children}</body>
    </html>
  );
}
