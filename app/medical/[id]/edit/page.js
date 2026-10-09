import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { requireLogin } from "@/lib/auth";
import { one } from "@/lib/params";
import { animalOptions } from "@/lib/options";
import MedicalForm from "@/components/MedicalForm";
import { updateMedical } from "../../actions";

export default async function EditMedical({ params, searchParams }) {
  requireLogin();
  if (!/^\d+$/.test(params.id)) notFound();
  const [record] = await sql`select * from medical_records where id = ${params.id}`;
  if (!record) notFound();
  const animals = await animalOptions();
  return (
    <div className="narrow">
      <h1>Edit medical record</h1>
      <MedicalForm action={updateMedical} record={record} animals={animals} error={one(searchParams?.error)} submitLabel="Save changes" />
    </div>
  );
}
