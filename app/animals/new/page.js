import { requireLogin } from "@/lib/auth";
import { one } from "@/lib/params";
import AnimalForm from "@/components/AnimalForm";
import { createAnimal } from "../actions";

export default function NewAnimal({ searchParams }) {
  requireLogin();
  return (
    <div className="narrow">
      <h1>Add animal</h1>
      <AnimalForm action={createAnimal} error={one(searchParams?.error)} submitLabel="Save animal" />
    </div>
  );
}
