"use server";

import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { requireLogin } from "@/lib/auth";
import { clean, friendly } from "@/lib/errors";

function read(fd) {
  const max = parseInt(clean(fd.get("max_animals")) || "1", 10);
  return {
    full_name: clean(fd.get("full_name")),
    email: clean(fd.get("email")),
    phone: clean(fd.get("phone")),
    neighbourhood: clean(fd.get("neighbourhood")),
    max_animals: Number.isFinite(max) && max > 0 ? max : 1,
    is_active: fd.get("is_active") === "on",
    notes: clean(fd.get("notes")),
  };
}

export async function createFoster(fd) {
  requireLogin();
  const f = read(fd);
  let err = null;
  try {
    await sql`
      insert into fosters (full_name, email, phone, neighbourhood, max_animals, is_active, notes)
      values (${f.full_name}, ${f.email}, ${f.phone}, ${f.neighbourhood}, ${f.max_animals}, ${f.is_active}, ${f.notes})`;
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/fosters/new?error=${encodeURIComponent(err)}`);
  redirect("/fosters");
}

export async function updateFoster(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  const f = read(fd);
  let err = null;
  try {
    await sql`
      update fosters set
        full_name = ${f.full_name}, email = ${f.email}, phone = ${f.phone},
        neighbourhood = ${f.neighbourhood}, max_animals = ${f.max_animals},
        is_active = ${f.is_active}, notes = ${f.notes}
      where id = ${id}`;
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/fosters/${id}/edit?error=${encodeURIComponent(err)}`);
  redirect(`/fosters/${id}`);
}

export async function deleteFoster(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  let err = null;
  try {
    await sql`delete from fosters where id = ${id}`;
  } catch (e) {
    err =
      e && e.code === "23503"
        ? "This foster has foster assignments, so they can't be deleted. Edit them and untick Active instead so the history is kept."
        : friendly(e);
  }
  if (err) redirect(`/fosters/${id}?error=${encodeURIComponent(err)}`);
  redirect("/fosters");
}
