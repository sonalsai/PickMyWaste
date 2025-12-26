import { motion } from "framer-motion";
import {
  FiUserPlus,
  FiMapPin,
  FiPackage,
  FiTruck,
  FiCreditCard,
} from "react-icons/fi";
import "./HowItWorks.scss";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiUserPlus />,
      title: "Register / Login",
      description: "Create your account in seconds with basic details",
    },
    {
      icon: <FiMapPin />,
      title: "Mark Location",
      description: "Set your pickup location on the interactive map",
    },
    {
      icon: <FiPackage />,
      title: "Select Waste Type & Time",
      description: "Choose waste category and preferred pickup slot",
    },
    {
      icon: <FiTruck />,
      title: "Pickup Assigned & Tracked",
      description: "Get assigned a verified collector and track in real-time",
    },
    {
      icon: <FiCreditCard />,
      title: "Pay Securely",
      description: "Complete payment after successful pickup",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works__container">
        <motion.div
          className="how-it-works__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="how-it-works__title">How It Works</h2>
          <p className="how-it-works__description">
            Get started in 5 simple steps. It's fast, easy, and transparent.
          </p>
        </motion.div>

        <motion.div
          className="how-it-works__steps"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card"
              variants={itemVariants}
            >
              <div className="step-card__number">{index + 1}</div>
              <div className="step-card__icon">{step.icon}</div>
              <div className="step-card__content">
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-card__connector"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
