// Small building blocks used by every add/edit form.

export function FormShell({ action, error, id, submitLabel = "Save", cancelHref, children }) {
  return (
    <form action={action} className="form">
      {error ? <p className="alert" role="alert">{error}</p> : null}
      {id ? <input type="hidden" name="id" value={id} /> : null}
      {children}
      <div className="form-buttons">
        <button type="submit" className="btn primary">{submitLabel}</button>
        <a href={cancelHref} className="btn">Cancel</a>
      </div>
    </form>
  );
}

export function TextField({ label, name, defaultValue, type = "text", required, hint, min, max }) {
  return (
    <label className="field">
      <span className="field-label">{label}{required ? " *" : ""}</span>
      <input type={type} name={name} defaultValue={defaultValue ?? ""} required={required} min={min} max={max} />
      {hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}

export function TextArea({ label, name, defaultValue, hint, required }) {
  return (
    <label className="field">
      <span className="field-label">{label}{required ? " *" : ""}</span>
      <textarea name={name} rows={4} defaultValue={defaultValue ?? ""} required={required} />
      {hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}

// options: ["Dog","Cat"] or [{ value: 3, label: "Maple (Dog)" }]
export function SelectField({ label, name, options, defaultValue, required, blankLabel }) {
  return (
    <label className="field">
      <span className="field-label">{label}{required ? " *" : ""}</span>
      <select name={name} defaultValue={defaultValue ?? ""} required={required}>
        {blankLabel !== undefined ? <option value="">{blankLabel}</option> : null}
        {options.map((o) => {
          const value = typeof o === "string" ? o : String(o.value);
          const text = typeof o === "string" ? o : o.label;
          return <option key={value} value={value}>{text}</option>;
        })}
      </select>
    </label>
  );
}

export function CheckField({ label, name, defaultChecked }) {
  return (
    <label className="field check">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span>{label}</span>
    </label>
  );
}
