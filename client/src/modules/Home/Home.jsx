import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../shared/components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutSection from "./components/AboutSection/AboutSection";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import PricingSection from "./components/PricingSection/PricingSection";
import ContactSection from "./components/ContactSection/ContactSection";
import Footer from "./components/Footer/Footer";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorks />
      <PricingSection />
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Home;
