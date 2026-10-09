import { sql } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";
import { one } from "@/lib/params";
import Badge from "@/components/Badge";
import Empty from "@/components/Empty";
import DeleteButton from "@/components/DeleteButton";
import { deleteAssignment, endAssignment } from "./actions";

export const metadata = { title: "Foster assignments | Calgary Paws & Whiskers" };

export default async function AssignmentsPage({ searchParams }) {
  const loggedIn = isLoggedIn();
  const error = one(searchParams?.error);
  const rows = await sql`
    select fa.id, fa.start_date, fa.end_date, fa.notes,
      a.id as animal_id, a.name as animal_name, a.species,
      f.id as foster_id, f.full_name,
      (fa.end_date is null or fa.end_date >= current_date) as is_current
    from foster_assignments fa
    join animals a on a.id = fa.animal_id
    join fosters f on f.id = fa.foster_id
    order by (fa.end_date is null or fa.end_date >= current_date) desc, fa.start_date desc, fa.id desc`;

  return (
    <>
      <div className="page-head">
        <h1>Foster assignments</h1>
        {loggedIn ? <a href="/assignments/new" className="btn primary">Add assignment</a> : null}
      </div>
      {error ? <p className="alert" role="alert">{error}</p> : null}
      {rows.length === 0 ? (
        <Empty>No foster assignments yet. Log in and choose Add assignment to place an animal with a foster.</Empty>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Animal</th><th>Foster</th><th>Start</th><th>End</th><th>Placement</th>{loggedIn ? <th></th> : null}</tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><a href={`/animals/${r.animal_id}`}>{r.animal_name}</a> ({r.species})</td>
                  <td><a href={`/fosters/${r.foster_id}`}>{r.full_name}</a></td>
                  <td>{r.start_date}</td>
                  <td>{r.end_date || "Ongoing"}</td>
                  <td><Badge value={r.is_current ? "Current" : "Ended"} /></td>
                  {loggedIn ? (
                    <td className="actions">
                      {!r.end_date ? (
                        <form action={endAssignment} className="inline-form">
                          <input type="hidden" name="id" value={r.id} />
                          <button type="submit" className="btn small">End today</button>
                        </form>
                      ) : null}
                      <a href={`/assignments/${r.id}/edit`} className="btn small">Edit</a>
                      <DeleteButton action={deleteAssignment} id={r.id} message="Delete this foster assignment? This can't be undone." />
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
