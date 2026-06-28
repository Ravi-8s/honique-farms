import "./WhatsApp.css";
import { FaWhatsapp } from "react-icons/fa";

function WhatsApp() {

  const phoneNumber = "918500001065"; // Replace with your number

  const message =
    "Hi Honique Farms! I would like to know more about your honey.";

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsApp;
