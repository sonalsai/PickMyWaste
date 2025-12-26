import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Button from "../../../../shared/components/Button/Button";
import "./ContactSection.scss";
import { snackbarService } from "../../../../services/snackbarService";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
    snackbarService.show("Message sent successfully!", "success");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email",
      value: "support@pickmywaste.com",
    },
    {
      icon: <FiPhone />,
      title: "Phone",
      value: "+91 80782 06009",
    },
    {
      icon: <FiMapPin />,
      title: "Headquarter",
      value: "Thrissur",
    },
  ];

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact__title">Get In Touch</h2>
          <p className="contact__description">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </motion.div>

        <div className="contact__content">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-card__icon">{info.icon}</div>
                <div className="contact-info-card__content">
                  <h3 className="contact-info-card__title">{info.title}</h3>
                  <p className="contact-info-card__value">{info.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="How can we help you?"
                rows="5"
                required
              ></textarea>
            </div>

            <Button type="submit" variant="primary" size="large" fullWidth>
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
