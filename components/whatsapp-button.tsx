import { MessageCircle } from "lucide-react";
import { profile } from "../content/profile";

const message = "Hola, he visitado tu portafolio profesional y me gustaría conversar contigo acerca de una oportunidad o colaboración.";

export function WhatsAppButton({ compact = false }: { compact?: boolean }) {
  return <a className={`button ${compact ? "secondary" : "primary"}`}
    href={`${profile.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">
    <MessageCircle size={18} /> {compact ? "Contáctame" : "Contáctame por WhatsApp"}
  </a>;
}
