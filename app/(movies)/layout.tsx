import React from "react";

export const metadata = {
  title: "BO7EN - Modulo de Filmes",
  description: "Modulo de renderizaçao de filmes",
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
}
