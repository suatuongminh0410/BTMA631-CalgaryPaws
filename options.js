import { sql } from "@/lib/db";

// Dropdown choices for forms that link to an animal or a foster.
export async function animalOptions() {
  const rows = await sql`select id, name, species from animals order by name`;
  return rows.map((r) => ({ value: r.id, label: `${r.name} (${r.species})` }));
}

export async function fosterOptions() {
  const rows = await sql`select id, full_name, is_active from fosters order by is_active desc, full_name`;
  return rows.map((r) => ({ value: r.id, label: r.is_active ? r.full_name : `${r.full_name} (inactive)` }));
}
