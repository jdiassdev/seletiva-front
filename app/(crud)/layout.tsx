// src/app/(dashboard)/layout.tsx
import Link from "next/link";
import React from "react";

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
