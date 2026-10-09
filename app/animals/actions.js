"use server";

import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { requireLogin } from "@/lib/auth";
import { clean, friendly } from "@/lib/errors";

function read(fd) {
  return {
    name: clean(fd.get("name")),
    species: clean(fd.get("species")),
    breed: clean(fd.get("breed")),
    sex: clean(fd.get("sex")) || "Unknown",
    approx_age: clean(fd.get("approx_age")),
    colour: clean(fd.get("colour")),
    drop_off_date: clean(fd.get("drop_off_date")),
    vaccination_status: clean(fd.get("vaccination_status")) || "Unknown",
    current_status: clean(fd.get("current_status")) || "At centre",
    notes: clean(fd.get("notes")),
  };
}

export async function createAnimal(fd) {
  requireLogin();
  const f = read(fd);
  let err = null;
  try {
    await sql`
      insert into animals (name, species, breed, sex, approx_age, colour, drop_off_date, vaccination_status, current_status, notes)
      values (${f.name}, ${f.species}, ${f.breed}, ${f.sex}, ${f.approx_age}, ${f.colour}, ${f.drop_off_date}, ${f.vaccination_status}, ${f.current_status}, ${f.notes})`;
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/animals/new?error=${encodeURIComponent(err)}`);
  redirect("/animals");
}

export async function updateAnimal(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  const f = read(fd);
  let err = null;
  try {
    await sql`
      update animals set
        name = ${f.name}, species = ${f.species}, breed = ${f.breed}, sex = ${f.sex},
        approx_age = ${f.approx_age}, colour = ${f.colour}, drop_off_date = ${f.drop_off_date},
        vaccination_status = ${f.vaccination_status}, current_status = ${f.current_status}, notes = ${f.notes}
      where id = ${id}`;
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/animals/${id}/edit?error=${encodeURIComponent(err)}`);
  redirect(`/animals/${id}`);
}

export async function deleteAnimal(fd) {
  requireLogin();
  const id = clean(fd.get("id"));
  let err = null;
  try {
    await sql`delete from animals where id = ${id}`;
  } catch (e) {
    err = friendly(e);
  }
  if (err) redirect(`/animals/${id}?error=${encodeURIComponent(err)}`);
  redirect("/animals");
}
