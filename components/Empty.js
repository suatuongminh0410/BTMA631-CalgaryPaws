import { Paw } from "@/components/Pets";

export default function Empty({ children }) {
  return (
    <p className="empty">
      <Paw size={20} className="empty-paw" />
      <span>{children}</span>
    </p>
  );
}
