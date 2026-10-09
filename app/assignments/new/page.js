import { requireLogin } from "@/lib/auth";
import { one } from "@/lib/params";
import { animalOptions, fosterOptions } from "@/lib/options";
import AssignmentForm from "@/components/AssignmentForm";
import { createAssignment } from "../actions";

export default async function NewAssignment({ searchParams }) {
  requireLogin();
  const [animals, fosters] = await Promise.all([animalOptions(), fosterOptions()]);
  return (
    <div className="narrow">
      <h1>Add foster assignment</h1>
      <AssignmentForm
        action={createAssignment}
        animals={animals}
        fosters={fosters}
        animalId={one(searchParams?.animal)}
        fosterId={one(searchParams?.foster)}
        error={one(searchParams?.error)}
        submitLabel="Save assignment"
      />
    </div>
  );
}
