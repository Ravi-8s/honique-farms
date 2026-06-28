import "./Contact.css";

function Contact() {
  return (
    <section id="contact" className="contact">

      <h2>Get In Touch</h2>

      <p className="contact-subtitle">
        We'd love to hear from you. Reach out for product enquiries, bulk orders,
        or any questions about Honique Farms.
      </p>

      <div className="contact-grid">

        <div className="contact-card">
          <h3>📞 Phone</h3>
          <p>+91 XXXXXXXXXX</p>
        </div>

        <div className="contact-card">
          <h3>📧 Email</h3>
          <p>info@honiquefarms.com</p>
        </div>

        <div className="contact-card">
          <h3>📍 Location</h3>
          <p>Andhra Pradesh, India</p>
        </div>

        <div className="contact-card">
          <h3>💬 WhatsApp</h3>
          <button>Chat on WhatsApp</button>
        </div>

      </div>

    </section>
  );
}

export default Contact;
