import React from "react";

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
