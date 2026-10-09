// Turns database errors into messages a person can understand.
export function friendly(e) {
  const code = e && e.code;
  if (code === "23503") return "This record is linked to other records, so that change isn't allowed.";
  if (code === "23514") return "One of the values isn't allowed. Check your dates (an end date can't be before the start date) and dropdown choices.";
  if (code === "22007" || code === "22008") return "One of the dates isn't valid.";
  if (code === "22P02") return "One of the values has the wrong format.";
  if (code === "23502") return "A required field is empty.";
  return "Something went wrong while saving. Please check the fields and try again.";
}

// Empty text boxes become null (blank) in the database.
export function clean(value) {
  const v = (value ?? "").toString().trim();
  return v === "" ? null : v;
}
