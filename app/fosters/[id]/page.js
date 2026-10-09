import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";
import { one } from "@/lib/params";
import Badge from "@/components/Badge";
import Empty from "@/components/Empty";
import DeleteButton from "@/components/DeleteButton";
import { deleteFoster } from "../actions";
import { deleteAssignment } from "../../assignments/actions";

export default async function FosterDetail({ params, searchParams }) {
  if (!/^\d+$/.test(params.id)) notFound();
  const [f] = await sql`select * from fosters where id = ${params.id}`;
  if (!f) notFound();

  const placements = await sql`
    select fa.id, fa.start_date, fa.end_date, fa.notes, a.id as animal_id, a.name, a.species
    from foster_assignments fa
    join animals a on a.id = fa.animal_id
    where fa.foster_id = ${f.id}
    order by fa.start_date desc, fa.id desc`;

  const loggedIn = isLoggedIn();
  const error = one(searchParams?.error);

  return (
    <>
      <p className="crumb"><a href="/fosters">All fosters</a></p>
      {error ? <p className="alert" role="alert">{error}</p> : null}
      <div className="page-head">
        <h1>{f.full_name}</h1>
        {loggedIn ? (
          <div className="button-row">
            <a href={`/fosters/${f.id}/edit`} className="btn">Edit</a>
            <DeleteButton
              action={deleteFoster}
              id={f.id}
              message={`Delete ${f.full_name}? Fosters who have assignments can't be deleted; mark them inactive instead.`}
            />
          </div>
        ) : null}
      </div>

      <dl className="facts">
        <div><dt>Email</dt><dd>{f.email || "—"}</dd></div>
        <div><dt>Phone</dt><dd>{f.phone || "—"}</dd></div>
        <div><dt>Neighbourhood</dt><dd>{f.neighbourhood || "—"}</dd></div>
        <div><dt>Most animals at once</dt><dd>{f.max_animals}</dd></div>
        <div><dt>Status</dt><dd><Badge value={f.is_active ? "Active" : "Inactive"} /></dd></div>
      </dl>
      {f.notes ? <p className="notes">{f.notes}</p> : null}

      <section>
        <div className="page-head">
          <h2>Animals fostered</h2>
          {loggedIn && f.is_active ? <a href={`/assignments/new?foster=${f.id}`} className="btn small">Place an animal</a> : null}
        </div>
        {placements.length === 0 ? (
          <Empty>{f.full_name} has not fostered any animals yet.</Empty>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Animal</th><th>Start</th><th>End</th><th>Notes</th>{loggedIn ? <th></th> : null}</tr>
              </thead>
              <tbody>
                {placements.map((p) => (
                  <tr key={p.id}>
                    <td><a href={`/animals/${p.animal_id}`}>{p.name}</a> ({p.species})</td>
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
