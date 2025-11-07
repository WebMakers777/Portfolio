// src/components/WhatsAppFloat.tsx
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  // Use the phone number from your contact section
  const phoneNumber = "917375038069";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappLink}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}