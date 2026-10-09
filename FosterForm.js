import { FormShell, TextField, TextArea, CheckField } from "@/components/Fields";

export default function FosterForm({ action, foster = {}, error, submitLabel }) {
  return (
    <FormShell action={action} error={error} id={foster.id} submitLabel={submitLabel} cancelHref={foster.id ? `/fosters/${foster.id}` : "/fosters"}>
      <TextField label="Full name" name="full_name" defaultValue={foster.full_name} required />
      <div className="row">
        <TextField label="Email" name="email" type="email" defaultValue={foster.email} />
        <TextField label="Phone" name="phone" type="tel" defaultValue={foster.phone} />
      </div>
      <TextField label="Neighbourhood" name="neighbourhood" defaultValue={foster.neighbourhood} hint='For example "Beltline" or "Tuscany".' />
      <TextField label="Most animals at one time" name="max_animals" type="number" min="1" max="20" defaultValue={foster.max_animals ?? 1} required />
      <CheckField label="Active (can take new animals)" name="is_active" defaultChecked={foster.is_active ?? true} />
      <TextArea label="Notes" name="notes" defaultValue={foster.notes} />
    </FormShell>
  );
}
