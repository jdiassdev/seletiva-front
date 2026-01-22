import React from "react";

export const metadata = {
  title: "BO7EN - Modulo de Ocorrencias",
  description: "Modulo de gerenciamento de ocorrencias",
};

export default function CrudLayout({
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
