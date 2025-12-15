import { useForm } from "react-hook-form";

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

  console.log(isSubmitting)

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <div className={`field ${errors.username ? "hasError" : ""}`}>
        <input
          type="text"
          id="username"
          placeholder=" "
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
        <label htmlFor="username">Username</label>
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>

      {/* Password */}
      <div className={`field ${errors.password ? "hasError" : ""}`}>
        <input
          type="password"
          id="password"
          placeholder=" "
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <label htmlFor="password">Password</label>
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      {/* Submit */}
      <button type="submit" disabled={!isValid}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
