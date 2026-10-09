import { requireLogin } from "@/lib/auth";
import { one } from "@/lib/params";
import FosterForm from "@/components/FosterForm";
import { createFoster } from "../actions";

export default function NewFoster({ searchParams }) {
  requireLogin();
  return (
    <div className="narrow">
      <h1>Add foster</h1>
      <FosterForm action={createFoster} error={one(searchParams?.error)} submitLabel="Save foster" />
    </div>
  );
}
