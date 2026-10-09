import { requireLogin } from "@/lib/auth";
import { one } from "@/lib/params";
import { animalOptions } from "@/lib/options";
import MedicalForm from "@/components/MedicalForm";
import { createMedical } from "../actions";

export default async function NewMedical({ searchParams }) {
  requireLogin();
  const animals = await animalOptions();
  return (
    <div className="narrow">
      <h1>Add medical record</h1>
      <MedicalForm action={createMedical} animals={animals} animalId={one(searchParams?.animal)} error={one(searchParams?.error)} submitLabel="Save record" />
    </div>
  );
}
