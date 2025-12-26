import "./Login.scss";
import LoginForm from "./LoginForm";
import AuthenticationSvg from "../../assets/images/undraw_authentication.svg";
import DeliveryTruckSvg from "../../assets/images/undraw_delivery-truck.svg";
import Navbar from "../../shared/components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const bannerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: custom * 0.2, ease: "easeOut" },
    }),
  };

  return (
    <div className="loginPage">
      <Navbar />
      <main>
        <motion.div
          className="loginFormSection"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="loginContainer">
            <div className="loginHeader">
              <h3 className="loginTitle">Sign in to PickMyWaste</h3>
              <h3 className="loginSubtitle">
                Manage your waste pickups schedules
              </h3>
            </div>
            <LoginForm />
            <div className="loginFooter">
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="registerLink"
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="bannersSection">
          <motion.div
            className="banner"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={bannerVariants}
            whileHover={{ scale: 1.03 }}
          >
            <img src={AuthenticationSvg} alt="Quick sign-in" />
            <p className="bannerText">Quick sign-in to schedule your pickup</p>
          </motion.div>

          <motion.div
            className="banner"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={bannerVariants}
            whileHover={{ scale: 1.03 }}
          >
            <img src={DeliveryTruckSvg} alt="We're ready" />
            <p className="bannerText">We're ready to pick up your waste</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Login;
