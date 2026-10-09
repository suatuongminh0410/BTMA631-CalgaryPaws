import { sql } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";
import { one } from "@/lib/params";
import { RECORD_TYPES } from "@/lib/choices";
import Empty from "@/components/Empty";
import DeleteButton from "@/components/DeleteButton";
import { deleteMedical } from "./actions";

export const metadata = { title: "Medical records | Calgary Paws & Whiskers" };

export default async function MedicalPage({ searchParams }) {
  const loggedIn = isLoggedIn();
  const type = one(searchParams?.type);
  const error = one(searchParams?.error);
  const rows = await sql`
    select m.id, m.record_type, m.record_date, m.description, m.vet_name, m.next_due_date,
      a.id as animal_id, a.name as animal_name
    from medical_records m
    join animals a on a.id = m.animal_id
    where (${type} = '' or m.record_type = ${type})
    order by m.record_date desc, m.id desc`;

  return (
    <>
      <div className="page-head">
        <h1>Medical records</h1>
        {loggedIn ? <a href="/medical/new" className="btn primary">Add record</a> : null}
      </div>
      {error ? <p className="alert" role="alert">{error}</p> : null}

      <form method="get" className="filters">
        <label className="field">
          <span className="field-label">Type</span>
          <select name="type" defaultValue={type}>
            <option value="">All</option>
            {RECORD_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <div className="filter-buttons">
          <button type="submit" className="btn">Filter</button>
          {type ? <a href="/medical" className="btn">Clear</a> : null}
        </div>
      </form>

      {rows.length === 0 ? (
        <Empty>{type ? "No records of that type." : "No medical records yet. Log in and choose Add record to create the first one."}</Empty>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Animal</th><th>Type</th><th>Description</th><th>Vet</th><th>Next due</th>{loggedIn ? <th></th> : null}</tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.record_date}</td>
                  <td><a href={`/animals/${r.animal_id}`}>{r.animal_name}</a></td>
                  <td>{r.record_type}</td>
                  <td>{r.description}</td>
                  <td>{r.vet_name || "—"}</td>
                  <td>{r.next_due_date || "—"}</td>
                  {loggedIn ? (
                    <td className="actions">
                      <a href={`/medical/${r.id}/edit`} className="btn small">Edit</a>
                      <DeleteButton action={deleteMedical} id={r.id} message="Delete this medical record? This can't be undone." />
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
