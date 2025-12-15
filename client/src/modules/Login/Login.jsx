import "./Login.scss";
import LoginForm from "./LoginForm";
import AuthenticationSvg from "../../assets/images/undraw_authentication.svg";
import DeliveryTruckSvg from "../../assets/images/undraw_delivery-truck.svg";
const Login = () => {
  return (
    <div className="loginPage">
      <header>
        <h1>Pick My Waste</h1>
      </header>
      <main>
        <div className="banner">
          <img src={AuthenticationSvg} alt="" />
          <span>Quick sign-in to schedule your pickup</span>
        </div>

        <div className="loginContainer">
          <div className="loginHeader">
            <h3 className="loginTitle">Welcome Back</h3>
            <h3 className="loginSubtitle">
              Sign in to manage your waste pickups, schedules, and payments
            </h3>
          </div>
          <LoginForm />
        </div>

        <div className="banner">
          <img src={DeliveryTruckSvg} alt="" />
          <span>We’re ready to pick up your waste</span>
        </div>
      </main>
    </div>
  );
};

export default Login;
