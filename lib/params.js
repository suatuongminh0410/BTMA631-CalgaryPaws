// Reads one value from the page address (e.g. ?species=Dog) as plain text.
export function one(v) {
  if (Array.isArray(v)) v = v[0];
  return (v ?? "").toString();
}
