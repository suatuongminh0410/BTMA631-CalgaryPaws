import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { requireLogin } from "@/lib/auth";
import { one } from "@/lib/params";
import FosterForm from "@/components/FosterForm";
import { updateFoster } from "../../actions";

export default async function EditFoster({ params, searchParams }) {
  requireLogin();
  if (!/^\d+$/.test(params.id)) notFound();
  const [foster] = await sql`select * from fosters where id = ${params.id}`;
  if (!foster) notFound();
  return (
    <div className="narrow">
      <h1>Edit {foster.full_name}</h1>
      <FosterForm action={updateFoster} foster={foster} error={one(searchParams?.error)} submitLabel="Save changes" />
    </div>
  );
}
