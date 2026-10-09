import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { requireLogin } from "@/lib/auth";
import { one } from "@/lib/params";
import AnimalForm from "@/components/AnimalForm";
import { updateAnimal } from "../../actions";

export default async function EditAnimal({ params, searchParams }) {
  requireLogin();
  if (!/^\d+$/.test(params.id)) notFound();
  const [animal] = await sql`select * from animals where id = ${params.id}`;
  if (!animal) notFound();
  return (
    <div className="narrow">
      <h1>Edit {animal.name}</h1>
      <AnimalForm action={updateAnimal} animal={animal} error={one(searchParams?.error)} submitLabel="Save changes" />
    </div>
  );
}
