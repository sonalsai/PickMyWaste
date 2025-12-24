import { useForm } from "react-hook-form";
import TextField from "../../shared/components/TextField/TextField";
import PasswordField from "../../shared/components/PasswordField/PasswordField";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { login } from "../../services/authService";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../store/authSlice";
import { setUser } from "../../store/userSlice";
import { snackbarService } from "../../services/snackbarService";

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    try {
      dispatch(signInStart());
      const response = await login(data);
      console.log(response);

      if (response.token) {
        sessionStorage.setItem("token", response.token);
      }

      // Dispatch to auth slice (for session state)
      dispatch(signInSuccess(response.user));

      // Dispatch to user slice (for detailed user info)
      dispatch(setUser(response.user));

      snackbarService.show("Login successful!", "success");
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Login failed";
      dispatch(signInFailure(errorMessage));
      snackbarService.show(errorMessage, "error");
    }
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
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="primary-btn"
      >
        {isSubmitting ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ display: "flex" }}
            >
              <FiLoader />
            </motion.div>
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
