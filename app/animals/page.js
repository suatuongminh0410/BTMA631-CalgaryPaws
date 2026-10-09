import { sql } from "@/lib/db";
import { isLoggedIn } from "@/lib/auth";
import { one } from "@/lib/params";
import { SPECIES, VACCINATION, ANIMAL_STATUS } from "@/lib/choices";
import Badge from "@/components/Badge";
import Empty from "@/components/Empty";

export const metadata = { title: "Animals | Calgary Paws & Whiskers" };

export default async function AnimalsPage({ searchParams }) {
  const q = one(searchParams?.q).trim();
  const species = one(searchParams?.species);
  const status = one(searchParams?.status);
  const vax = one(searchParams?.vax);
  const loggedIn = isLoggedIn();

  const rows = await sql`
    select id, name, species, breed, drop_off_date, vaccination_status, current_status
    from animals
    where (${q} = '' or name ilike ${"%" + q + "%"} or coalesce(breed, '') ilike ${"%" + q + "%"})
      and (${species} = '' or species = ${species})
      and (${status} = '' or current_status = ${status})
      and (${vax} = '' or vaccination_status = ${vax})
    order by drop_off_date desc, name`;

  const filtered = q || species || status || vax;

  return (
    <>
      <div className="page-head">
        <h1>Animals</h1>
        {loggedIn ? <a href="/animals/new" className="btn primary">Add animal</a> : null}
      </div>

      <form method="get" className="filters">
        <label className="field">
          <span className="field-label">Search name or breed</span>
          <input type="search" name="q" defaultValue={q} />
        </label>
        <label className="field">
          <span className="field-label">Species</span>
          <select name="species" defaultValue={species}>
            <option value="">All</option>
            {SPECIES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="field">
          <span className="field-label">Status</span>
          <select name="status" defaultValue={status}>
            <option value="">All</option>
            {ANIMAL_STATUS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="field">
          <span className="field-label">Vaccination</span>
          <select name="vax" defaultValue={vax}>
            <option value="">All</option>
            {VACCINATION.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <div className="filter-buttons">
          <button type="submit" className="btn">Filter</button>
          {filtered ? <a href="/animals" className="btn">Clear</a> : null}
        </div>
      </form>

      {rows.length === 0 ? (
        <Empty>{filtered ? "No animals match those filters." : "No animals yet. Log in and choose Add animal to create the first record."}</Empty>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Species</th><th>Breed</th><th>Dropped off</th><th>Vaccinations</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id}>
                  <td><a href={`/animals/${a.id}`}>{a.name}</a></td>
                  <td>{a.species}</td>
                  <td>{a.breed || "—"}</td>
                  <td>{a.drop_off_date}</td>
                  <td><Badge value={a.vaccination_status} /></td>
                  <td><Badge value={a.current_status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
