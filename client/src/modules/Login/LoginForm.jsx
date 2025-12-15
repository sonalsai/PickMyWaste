import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    // call API here
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <div className="field">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="username"
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
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>

      {/* Password */}
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      {/* Submit */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
