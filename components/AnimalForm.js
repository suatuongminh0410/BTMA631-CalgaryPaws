import { FormShell, TextField, SelectField, TextArea } from "@/components/Fields";
import { SPECIES, SEX, VACCINATION, ANIMAL_STATUS } from "@/lib/choices";

export default function AnimalForm({ action, animal = {}, error, submitLabel }) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <FormShell action={action} error={error} id={animal.id} submitLabel={submitLabel} cancelHref={animal.id ? `/animals/${animal.id}` : "/animals"}>
      <TextField label="Name" name="name" defaultValue={animal.name} required />
      <div className="row">
        <SelectField label="Species" name="species" options={SPECIES} defaultValue={animal.species} required />
        <SelectField label="Sex" name="sex" options={SEX} defaultValue={animal.sex || "Unknown"} />
      </div>
      <div className="row">
        <TextField label="Breed" name="breed" defaultValue={animal.breed} />
        <TextField label="Colour" name="colour" defaultValue={animal.colour} />
      </div>
      <TextField label="Approximate age" name="approx_age" defaultValue={animal.approx_age} hint='For example "8 weeks" or "3 years".' />
      <TextField label="Drop-off date" name="drop_off_date" type="date" defaultValue={animal.drop_off_date || today} required />
      <div className="row">
        <SelectField label="Vaccination status" name="vaccination_status" options={VACCINATION} defaultValue={animal.vaccination_status || "Unknown"} required />
        <SelectField label="Current status" name="current_status" options={ANIMAL_STATUS} defaultValue={animal.current_status || "At centre"} required />
      </div>
      <TextArea label="Notes" name="notes" defaultValue={animal.notes} />
    </FormShell>
  );
}
