import { motion } from "framer-motion";
import { FiCalendar, FiDollarSign, FiShield, FiMapPin } from "react-icons/fi";
import "./AboutSection.scss";

const AboutSection = () => {
  const features = [
    {
      icon: <FiCalendar />,
      title: "Scheduled Pickup",
      description: "Book pickups at your convenience with flexible time slots",
    },
    {
      icon: <FiDollarSign />,
      title: "Transparent Pricing",
      description:
        "Pay based on waste type and quantity with no hidden charges",
    },
    {
      icon: <FiShield />,
      title: "Verified Partners",
      description:
        "All collectors are verified and background-checked for safety",
    },
    {
      icon: <FiMapPin />,
      title: "Live Tracking",
      description:
        "Track your pickup in real-time from assignment to completion",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="about" id="about">
      <div className="about__container">
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about__title">Why Choose Us?</h2>
          <p className="about__description">
            We're revolutionizing waste management with organized collection,
            digital scheduling, and complete transparency. Join thousands of
            satisfied customers making a positive environmental impact.
          </p>
        </motion.div>

        <motion.div
          className="about__features"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="feature-card__icon">{feature.icon}</div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
