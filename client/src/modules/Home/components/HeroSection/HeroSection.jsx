import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import Button from "../../../../shared/components/Button/Button";
import HeroIllustration from "../../../../assets/images/hero-illustration.svg";
import "./HeroSection.scss";

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="hero" id="home">
      <div className="hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__badge" variants={itemVariants}>
            <span className="hero__badge-icon">🌱</span>
            <span className="hero__badge-text">
              Eco-Friendly Waste Management
            </span>
          </motion.div>

          <motion.h1 className="hero__title" variants={itemVariants}>
            Smart & Scheduled{" "}
            <span className="hero__title-highlight">Waste Pickup</span> for
            Homes and Businesses
          </motion.h1>

          <motion.p className="hero__subtitle" variants={itemVariants}>
            Book waste pickups, track collectors, and contribute to a cleaner
            environment — all in one place. Experience hassle-free waste
            management with transparent pricing and verified partners.
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <Button
              variant="primary"
              size="large"
              icon={<FiCalendar />}
              onClick={() => navigate("/register")}
            >
              Schedule a Pickup
            </Button>
            <Button
              variant="outline"
              size="large"
              icon={<FiArrowRight />}
              onClick={() => {
                document
                  .querySelector("#how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              How It Works
            </Button>
          </motion.div>

          {/* <motion.div className="hero__stats" variants={itemVariants}>
            <div className="hero__stat">
              <span className="hero__stat-number">10K+</span>
              <span className="hero__stat-label">Happy Customers</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">500+</span>
              <span className="hero__stat-label">Verified Partners</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">50K+</span>
              <span className="hero__stat-label">Pickups Completed</span>
            </div>
          </motion.div> */}
        </motion.div>

        <motion.div
          className="hero__visual"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero__illustration">
            <img
              src={HeroIllustration}
              alt="Eco-friendly waste management"
              className="hero__svg"
            />
          </div>

          {/* Floating Cards */}
          <motion.div
            className="hero__floating-card hero__floating-card--1"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="hero__card-icon">📍</div>
            <div className="hero__card-text">
              <div className="hero__card-title">Live Tracking</div>
              <div className="hero__card-subtitle">Real-time updates</div>
            </div>
          </motion.div>

          <motion.div
            className="hero__floating-card hero__floating-card--2"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div className="hero__card-icon">✅</div>
            <div className="hero__card-text">
              <div className="hero__card-title">Verified Partners</div>
              <div className="hero__card-subtitle">100% trusted</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="hero__bg-decoration hero__bg-decoration--1"></div>
      <div className="hero__bg-decoration hero__bg-decoration--2"></div>
      <div className="hero__bg-decoration hero__bg-decoration--3"></div>
    </section>
  );
};

export default HeroSection;
