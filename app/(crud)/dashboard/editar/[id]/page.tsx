"use client";

import { useParams } from "next/navigation";
import CaseFormPage from "../../nova/page";

export default function EditPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      {/* Passamos o id para o formulário saber que é uma edição */}
      <CaseFormPage/>
    </div>
  );
}
