import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import Button from "../../../../shared/components/Button/Button";
import "./PricingSection.scss";

const PricingSection = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: "Household Pickup",
      price: "₹50",
      period: "per pickup",
      description: "Perfect for residential waste management",
      features: [
        "Scheduled pickup",
        "Up to 10kg waste",
        "Dry & wet waste separation",
        "Live tracking",
        "Verified collectors",
      ],
      popular: false,
    },
    {
      name: "Commercial Pickup",
      price: "₹200",
      period: "per pickup",
      description: "Ideal for hotels, offices, and businesses",
      features: [
        "Priority scheduling",
        "Up to 50kg waste",
        "All waste types",
        "Live tracking",
        "Dedicated support",
        "Monthly reports",
      ],
      popular: true,
    },
    {
      name: "Bulk Waste",
      price: "Custom",
      period: "quote-based",
      description: "For construction sites and large volumes",
      features: [
        "Flexible scheduling",
        "Unlimited quantity",
        "All waste categories",
        "Multiple pickups",
        "Account manager",
        "Compliance reports",
      ],
      popular: false,
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
    <section className="pricing" id="pricing">
      <div className="pricing__container">
        <motion.div
          className="pricing__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="pricing__title">Transparent Pricing</h2>
          <p className="pricing__description">
            No hidden charges. Pay only for what you use. Choose the plan that
            fits your needs.
          </p>
        </motion.div>

        <motion.div
          className="pricing__cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${
                plan.popular ? "pricing-card--popular" : ""
              }`}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {plan.popular && (
                <div className="pricing-card__badge">Most Popular</div>
              )}
              <div className="pricing-card__header">
                <h3 className="pricing-card__name">{plan.name}</h3>
                <p className="pricing-card__description">{plan.description}</p>
              </div>
              <div className="pricing-card__price">
                <span className="pricing-card__amount">{plan.price}</span>
                <span className="pricing-card__period">{plan.period}</span>
              </div>
              <ul className="pricing-card__features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="pricing-card__feature">
                    <FiCheck className="pricing-card__check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "primary" : "outline"}
                fullWidth
                onClick={() => navigate("/register")}
              >
                Book Now
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
