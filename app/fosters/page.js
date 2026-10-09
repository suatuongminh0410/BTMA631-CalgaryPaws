import { sql } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";
import Empty from "@/components/Empty";
import Badge from "@/components/Badge";

export const metadata = { title: "Fosters | Calgary Paws & Whiskers" };

export default async function FostersPage() {
  const loggedIn = isLoggedIn();
  const rows = await sql`
    select f.id, f.full_name, f.email, f.phone, f.neighbourhood, f.max_animals, f.is_active,
      (select count(*)::int from foster_assignments fa
        where fa.foster_id = f.id and fa.start_date <= current_date
          and (fa.end_date is null or fa.end_date >= current_date)) as current_count
    from fosters f
    order by f.is_active desc, f.full_name`;

  return (
    <>
      <div className="page-head">
        <h1>Fosters</h1>
        {loggedIn ? <a href="/fosters/new" className="btn primary">Add foster</a> : null}
      </div>
      {rows.length === 0 ? (
        <Empty>No fosters yet. Log in and choose Add foster to create the first one.</Empty>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Neighbourhood</th><th>Email</th><th>Phone</th><th>Animals now</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.id}>
                  <td><a href={`/fosters/${f.id}`}>{f.full_name}</a></td>
                  <td>{f.neighbourhood || "—"}</td>
                  <td>{f.email || "—"}</td>
                  <td>{f.phone || "—"}</td>
                  <td>{f.current_count} of {f.max_animals}</td>
                  <td><Badge value={f.is_active ? "Active" : "Inactive"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
