import { FormShell, TextField, SelectField, TextArea } from "@/components/Fields";
import { RECORD_TYPES } from "@/lib/choices";

export default function MedicalForm({ action, record = {}, animals, animalId, error, submitLabel }) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <FormShell action={action} error={error} id={record.id} submitLabel={submitLabel} cancelHref="/medical">
      <SelectField label="Animal" name="animal_id" options={animals} defaultValue={record.animal_id ?? animalId} blankLabel="Choose an animal" required />
      <div className="row">
        <SelectField label="Type" name="record_type" options={RECORD_TYPES} defaultValue={record.record_type || "Checkup"} required />
        <TextField label="Date" name="record_date" type="date" defaultValue={record.record_date || today} required />
      </div>
      <TextArea label="Description" name="description" defaultValue={record.description} required hint='For example "Rabies vaccine" or "Dental cleaning".' />
      <div className="row">
        <TextField label="Veterinarian" name="vet_name" defaultValue={record.vet_name} />
        <TextField label="Next due date" name="next_due_date" type="date" defaultValue={record.next_due_date} hint="For example when a booster is due." />
      </div>
    </FormShell>
  );
}
