import { sql } from "@/lib/db";
import Empty from "@/components/Empty";
import { PetPair } from "@/components/Pets";

export default async function Home() {
  const [c] = await sql`
    select
      count(*)::int as total,
      (count(*) filter (where current_status = 'At centre'))::int as at_centre,
      (count(*) filter (where current_status = 'In foster'))::int as in_foster,
      (count(*) filter (where vaccination_status = 'Overdue' and current_status <> 'Adopted'))::int as overdue
    from animals`;

  const due = await sql`
    select m.id, m.record_type, m.next_due_date, a.id as animal_id, a.name
    from medical_records m
    join animals a on a.id = m.animal_id
    where m.next_due_date is not null
      and m.next_due_date <= current_date + 14
      and a.current_status <> 'Adopted'
    order by m.next_due_date
    limit 8`;

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Every animal, every foster, one place.</h1>
          <p className="lead">
            Track the dogs and cats at Calgary Paws &amp; Whiskers: when they arrived, whether their
            vaccinations are current, who is fostering them, and their medical history.
          </p>
        </div>
        <PetPair className="hero-art" />
      </section>

      <section className="stats" aria-label="Summary">
        <a className="stat" href="/animals?status=At centre">
          <span className="stat-number">{c.at_centre}</span>
          <span className="stat-label">at the centre</span>
        </a>
        <a className="stat" href="/animals?status=In foster">
          <span className="stat-number">{c.in_foster}</span>
          <span className="stat-label">in foster homes</span>
        </a>
        <a className="stat warn" href="/animals?vax=Overdue">
          <span className="stat-number">{c.overdue}</span>
          <span className="stat-label">vaccinations overdue</span>
        </a>
        <a className="stat" href="/animals">
          <span className="stat-number">{c.total}</span>
          <span className="stat-label">animals on record</span>
        </a>
      </section>

      <section>
        <h2>Follow-ups due in the next 14 days</h2>
        {due.length === 0 ? (
          <Empty>Nothing due soon. Add a "next due date" to a medical record to see reminders here.</Empty>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Animal</th><th>Type</th><th>Due</th></tr>
              </thead>
              <tbody>
                {due.map((d) => (
                  <tr key={d.id}>
                    <td><a href={`/animals/${d.animal_id}`}>{d.name}</a></td>
                    <td>{d.record_type}</td>
                    <td>{d.next_due_date}</td>
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
