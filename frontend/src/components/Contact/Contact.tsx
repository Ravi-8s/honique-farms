import "./Contact.css";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

function Contact() {

  const phoneNumber = "918500001065";

  const message =
    "Hi Honique Farms! I'm interested in your Multiflora Honey. Could you please share the available sizes and prices?";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section id="contact" className="contact">

      <h2>Get In Touch</h2>

      <p className="contact-subtitle">
        We'd love to hear from you. Reach out for product enquiries, bulk orders,
        or any questions about Honique Farms.
      </p>

      <div className="contact-grid">

        <div className="contact-card">
          <h3><FaPhoneAlt /> Phone</h3>
          <p>+91 8500001065</p>
        </div>

        <div className="contact-card">
          <h3><FaEnvelope /> Email</h3>
          <p>info@honiquefarms.com</p>
        </div>

        <div className="contact-card">
          <h3><FaMapMarkerAlt /> Location</h3>
          <p>Andhra Pradesh, India</p>
        </div>

        <div className="contact-card">
          <h3><FaWhatsapp /> WhatsApp</h3>

          <button
            onClick={() => window.open(whatsappUrl, "_blank")}
          >
            Chat on WhatsApp
          </button>

        </div>

      </div>

    </section>
  );
}

export default Contact;
