import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { requireLogin } from "@/lib/auth";
import { one } from "@/lib/params";
import { animalOptions, fosterOptions } from "@/lib/options";
import AssignmentForm from "@/components/AssignmentForm";
import { updateAssignment } from "../../actions";

export default async function EditAssignment({ params, searchParams }) {
  requireLogin();
  if (!/^\d+$/.test(params.id)) notFound();
  const [assignment] = await sql`select * from foster_assignments where id = ${params.id}`;
  if (!assignment) notFound();
  const [animals, fosters] = await Promise.all([animalOptions(), fosterOptions()]);
  return (
    <div className="narrow">
      <h1>Edit foster assignment</h1>
      <AssignmentForm
        action={updateAssignment}
        assignment={assignment}
        animals={animals}
        fosters={fosters}
        error={one(searchParams?.error)}
        submitLabel="Save changes"
      />
    </div>
  );
}
