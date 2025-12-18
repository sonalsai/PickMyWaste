import { useForm } from "react-hook-form";
import TextField from "../../shared/components/TextField/TextField";
import PasswordField from "../../shared/components/PasswordField/PasswordField";
import { FiUser, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import "./LoginForm.scss";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    // call API here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement Google OAuth
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Implement Facebook OAuth
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <TextField
        id="username"
        label="Username"
        autoComplete="username"
        icon={<FiUser />}
        error={errors.username?.message}
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 6,
            message: "Username must be at least 6 characters",
          },
          maxLength: {
            value: 12,
            message: "Username must be at most 12 characters",
          },
        })}
      />

      {/* Password */}
      <PasswordField
        id="password"
        label="Password"
        autoComplete="current-password"
        icon={<FiLock />}
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
      />

      {/* Submit */}
      <button type="submit" disabled={!isValid} className="primary-btn">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
