import "./Login.scss";
import LoginForm from "./LoginForm";
import AuthenticationSvg from "../../assets/images/undraw_authentication.svg";
import DeliveryTruckSvg from "../../assets/images/undraw_delivery-truck.svg";
import Navbar from "../../shared/components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="loginPage">
      <Navbar showLinks={true} />
      <main>
        <div className="banner left-banner">
          <img src={AuthenticationSvg} alt="" />
          <p className="bannerText">Quick sign-in to schedule your pickup</p>
        </div>

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

        <div className="banner right-banner">
          <img src={DeliveryTruckSvg} alt="" style={{ width: "560px" }} />
          <p className="bannerText">We’re ready to pick up your waste</p>
        </div>
      </main>
    </div>
  );
};

export default Login;
