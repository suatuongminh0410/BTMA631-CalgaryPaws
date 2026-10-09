import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";
import { one } from "@/lib/params";
import Badge from "@/components/Badge";
import Empty from "@/components/Empty";
import DeleteButton from "@/components/DeleteButton";
import { deleteAnimal } from "../actions";
import { deleteMedical } from "../../medical/actions";
import { deleteAssignment } from "../../assignments/actions";

export default async function AnimalDetail({ params, searchParams }) {
  if (!/^\d+$/.test(params.id)) notFound();
  const [a] = await sql`select * from animals where id = ${params.id}`;
  if (!a) notFound();

  const records = await sql`
    select * from medical_records where animal_id = ${a.id}
    order by record_date desc, id desc`;
  const placements = await sql`
    select fa.id, fa.start_date, fa.end_date, fa.notes, f.id as foster_id, f.full_name
    from foster_assignments fa
    join fosters f on f.id = fa.foster_id
    where fa.animal_id = ${a.id}
    order by fa.start_date desc, fa.id desc`;

  const loggedIn = isLoggedIn();
  const error = one(searchParams?.error);

  return (
    <>
      <p className="crumb"><a href="/animals">All animals</a></p>
      {error ? <p className="alert" role="alert">{error}</p> : null}
      <div className="page-head">
        <h1>{a.name}</h1>
        {loggedIn ? (
          <div className="button-row">
            <a href={`/animals/${a.id}/edit`} className="btn">Edit</a>
            <DeleteButton
              action={deleteAnimal}
              id={a.id}
              message={`Delete ${a.name}? This also deletes all of ${a.name}'s medical records and foster history. This can't be undone.`}
            />
          </div>
        ) : null}
      </div>

      <dl className="facts">
        <div><dt>Species</dt><dd>{a.species}</dd></div>
        <div><dt>Sex</dt><dd>{a.sex || "Unknown"}</dd></div>
        <div><dt>Breed</dt><dd>{a.breed || "—"}</dd></div>
        <div><dt>Colour</dt><dd>{a.colour || "—"}</dd></div>
        <div><dt>Approximate age</dt><dd>{a.approx_age || "—"}</dd></div>
        <div><dt>Dropped off</dt><dd>{a.drop_off_date}</dd></div>
        <div><dt>Vaccinations</dt><dd><Badge value={a.vaccination_status} /></dd></div>
        <div><dt>Status</dt><dd><Badge value={a.current_status} /></dd></div>
      </dl>
      {a.notes ? <p className="notes">{a.notes}</p> : null}

      <section>
        <div className="page-head">
          <h2>Medical records</h2>
          {loggedIn ? <a href={`/medical/new?animal=${a.id}`} className="btn small">Add record</a> : null}
        </div>
        {records.length === 0 ? (
          <Empty>No medical records for {a.name} yet.</Empty>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Date</th><th>Type</th><th>Description</th><th>Vet</th><th>Next due</th>{loggedIn ? <th></th> : null}</tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <td>{r.record_date}</td>
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
      </section>

      <section>
        <div className="page-head">
          <h2>Foster history</h2>
          {loggedIn ? <a href={`/assignments/new?animal=${a.id}`} className="btn small">Place in foster</a> : null}
        </div>
        {placements.length === 0 ? (
          <Empty>{a.name} has not been placed with a foster.</Empty>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Foster</th><th>Start</th><th>End</th><th>Notes</th>{loggedIn ? <th></th> : null}</tr>
              </thead>
              <tbody>
                {placements.map((p) => (
                  <tr key={p.id}>
                    <td><a href={`/fosters/${p.foster_id}`}>{p.full_name}</a></td>
                    <td>{p.start_date}</td>
                    <td>{p.end_date || "Ongoing"}</td>
                    <td>{p.notes || "—"}</td>
                    {loggedIn ? (
                      <td className="actions">
                        <a href={`/assignments/${p.id}/edit`} className="btn small">Edit</a>
                        <DeleteButton action={deleteAssignment} id={p.id} message="Delete this foster assignment? This can't be undone." />
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
