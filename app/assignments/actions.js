"use server";

import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { requireLogin } from "@/lib/auth";
import { clean, friendly } from "@/lib/errors";

function read(fd) {
  return {
    animal_id: clean(fd.get("animal_id")),
    foster_id: clean(fd.get("foster_id")),
    start_date: clean(fd.get("start_date")),
    end_date: clean(fd.get("end_date")),
    notes: clean(fd.get("notes")),
  };
}

// Keeps the animal's "current status" in step with its foster placements.
async function syncStatus(animalId) {
  if (!animalId) return;
  await sql`
    update animals set current_status =
      case when exists (
        select 1 from foster_assignments
        where animal_id = ${animalId} and start_date <= current_date
          and (end_date is null or end_date >= current_date)
      ) then 'In foster' else 'At centre' end
    where id = ${animalId} and current_status <> 'Adopted'`;
}

// Returns a message if the placement isn't allowed, otherwise null.
async function problem(f, existing) {
  if (!f.animal_id || !f.foster_id || !f.start_date) return "Animal, foster and start date are all required.";
  const [foster] = await sql`select full_name, is_active, max_animals from fosters where id = ${f.foster_id}`;
  if (!foster) return "That foster no longer exists.";
  const fosterChanged = !existing || String(existing.foster_id) !== String(f.foster_id);
  if (!foster.is_active && fosterChanged) return `${foster.full_name} is marked inactive. Make them active first, or choose another foster.`;

  const today = new Date().toISOString().slice(0, 10);
  const activeNow = f.start_date <= today && (!f.end_date || f.end_date >= today);
  if (activeNow) {
    const excludeId = existing ? existing.id : 0;
    const [{ n }] = await sql`
      select count(*)::int as n from foster_assignments
      where foster_id = ${f.foster_id} and id <> ${excludeId}
        and start_date <= current_date and (end_date is null or end_date >= current_date)`;
    if (n + 1 > foster.max_animals) {
      return `${foster.full_name} already has ${n} animal${n === 1 ? "" : "s"} and can take at most ${foster.max_animals} at once.`;
    }
  }
  return null;
}

export async function createAssignment(fd) {
  requireLogin();
  const f = read(fd);
  let err = null;
  try {
    err = await problem(f, null);
    if (!err) {
      await sql`
        insert into foster_assignments (animal_id, foster_id, start_date, end_date, notes)
        values (${f.animal_id}, ${f.foster_id}, ${f.start_date}, ${f.end_date}, ${f.notes})`;
      await syncStatus(f.animal_id);
    }
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/assignments/new?error=${encodeURIComponent(err)}`);
  redirect("/assignments");
}

export async function updateAssignment(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  const f = read(fd);
  let err = null;
  try {
    const [existing] = await sql`select id, animal_id, foster_id from foster_assignments where id = ${id}`;
    err = await problem(f, existing);
    if (!err) {
      await sql`
        update foster_assignments set
          animal_id = ${f.animal_id}, foster_id = ${f.foster_id},
          start_date = ${f.start_date}, end_date = ${f.end_date}, notes = ${f.notes}
        where id = ${id}`;
      await syncStatus(f.animal_id);
      if (existing && String(existing.animal_id) !== String(f.animal_id)) await syncStatus(existing.animal_id);
    }
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/assignments/${id}/edit?error=${encodeURIComponent(err)}`);
  redirect("/assignments");
}

export async function endAssignment(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  let err = null;
  try {
    const [row] = await sql`
      update foster_assignments set end_date = greatest(start_date, current_date)
      where id = ${id} and end_date is null
      returning animal_id`;
    if (row) await syncStatus(row.animal_id);
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/assignments?error=${encodeURIComponent(err)}`);
  redirect("/assignments");
}

export async function deleteAssignment(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  let err = null;
  try {
    const [row] = await sql`delete from foster_assignments where id = ${id} returning animal_id`;
    if (row) await syncStatus(row.animal_id);
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/assignments?error=${encodeURIComponent(err)}`);
  redirect("/assignments");
}
