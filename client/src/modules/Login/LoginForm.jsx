import { useForm } from "react-hook-form";
import TextField from "../../shared/components/TextField/TextField";
import PasswordField from "../../shared/components/PasswordField/PasswordField";
import { FiMail, FiLock } from "react-icons/fi";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    // call API here
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <TextField
        id="email"
        label="Email"
        autoComplete="email"
        icon={<FiMail />}
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
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
