import { FormShell, TextField, SelectField, TextArea } from "@/components/Fields";

export default function AssignmentForm({ action, assignment = {}, animals, fosters, error, submitLabel, animalId, fosterId }) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <FormShell action={action} error={error} id={assignment.id} submitLabel={submitLabel} cancelHref="/assignments">
      <SelectField label="Animal" name="animal_id" options={animals} defaultValue={assignment.animal_id ?? animalId} blankLabel="Choose an animal" required />
      <SelectField label="Foster" name="foster_id" options={fosters} defaultValue={assignment.foster_id ?? fosterId} blankLabel="Choose a foster" required />
      <div className="row">
        <TextField label="Start date" name="start_date" type="date" defaultValue={assignment.start_date || today} required />
        <TextField label="End date" name="end_date" type="date" defaultValue={assignment.end_date} hint="Leave blank if the placement is ongoing." />
      </div>
      <TextArea label="Notes" name="notes" defaultValue={assignment.notes} />
    </FormShell>
  );
}
