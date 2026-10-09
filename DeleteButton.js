"use client";

// A delete button that asks "Are you sure?" before doing anything.
export default function DeleteButton({ action, id, message, label = "Delete" }) {
  return (
    <form action={action} className="inline-form">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="btn danger small"
        onClick={(e) => {
          if (!window.confirm(message)) e.preventDefault();
        }}
      >
        {label}
      </button>
    </form>
  );
}
