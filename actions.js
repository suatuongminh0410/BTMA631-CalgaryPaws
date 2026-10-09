"use server";

import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { requireLogin } from "@/lib/auth";
import { clean, friendly } from "@/lib/errors";

function read(fd) {
  return {
    animal_id: clean(fd.get("animal_id")),
    record_type: clean(fd.get("record_type")),
    record_date: clean(fd.get("record_date")),
    description: clean(fd.get("description")),
    vet_name: clean(fd.get("vet_name")),
    next_due_date: clean(fd.get("next_due_date")),
  };
}

export async function createMedical(fd) {
  requireLogin();
  const f = read(fd);
  let err = null;
  try {
    await sql`
      insert into medical_records (animal_id, record_type, record_date, description, vet_name, next_due_date)
      values (${f.animal_id}, ${f.record_type}, ${f.record_date}, ${f.description}, ${f.vet_name}, ${f.next_due_date})`;
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/medical/new?error=${encodeURIComponent(err)}`);
  redirect("/medical");
}

export async function updateMedical(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  const f = read(fd);
  let err = null;
  try {
    await sql`
      update medical_records set
        animal_id = ${f.animal_id}, record_type = ${f.record_type}, record_date = ${f.record_date},
        description = ${f.description}, vet_name = ${f.vet_name}, next_due_date = ${f.next_due_date}
      where id = ${id}`;
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/medical/${id}/edit?error=${encodeURIComponent(err)}`);
  redirect("/medical");
}

export async function deleteMedical(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  let err = null;
  try {
    await sql`delete from medical_records where id = ${id}`;
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/medical?error=${encodeURIComponent(err)}`);
  redirect("/medical");
}
