// Coloured label for statuses, e.g. "Overdue" shows in red.
export default function Badge({ value }) {
  if (!value) return null;
  const slug = String(value).toLowerCase().replace(/[^a-z]+/g, "-");
  return <span className={`badge badge-${slug}`}>{value}</span>;
}
