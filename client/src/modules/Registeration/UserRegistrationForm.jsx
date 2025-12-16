import { useForm } from "react-hook-form";
import { useState } from "react";
import TextField from "../../shared/components/TextField/TextField";
import PasswordField from "../../shared/components/PasswordField/PasswordField";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiMapPin,
  FiMap,
} from "react-icons/fi";
import "./RegistrationForm.scss";

const UserRegistrationForm = ({ currentStep, register, errors, watch }) => {
  const password = watch("password");

  return (
    <div className="formContent">
      {/* Step 0: Account Information */}
      {currentStep === 0 && (
        <div className="formStep">
          <div className="formSection">
            <TextField
              id="fullName"
              label="Full Name"
              autoComplete="name"
              icon={<FiUser />}
              error={errors.fullName?.message}
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />

            <TextField
              id="email"
              label="Email Address"
              type="email"
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

            <TextField
              id="mobile"
              label="Mobile Number"
              type="tel"
              autoComplete="tel"
              icon={<FiPhone />}
              error={errors.mobile?.message}
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />

            <PasswordField
              id="password"
              label="Password"
              autoComplete="new-password"
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

            <PasswordField
              id="confirmPassword"
              label="Confirm Password"
              autoComplete="new-password"
              icon={<FiLock />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
          </div>
        </div>
      )}

      {/* Step 1: Pickup Location */}
      {currentStep === 1 && (
        <div className="formStep">
          <div className="formSection">
            <h3>Pickup Location</h3>

            <TextField
              id="address"
              label="Address Line"
              icon={<FiMapPin />}
              error={errors.address?.message}
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Please enter a complete address",
                },
              })}
            />

            <div className="formRow">
              <TextField
                id="city"
                label="City"
                icon={<FiMap />}
                error={errors.city?.message}
                {...register("city", { required: "City is required" })}
              />

              <TextField
                id="pincode"
                label="Pincode"
                icon={<FiMapPin />}
                error={errors.pincode?.message}
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Invalid pincode",
                  },
                })}
              />
            </div>

            <div className="mapPinNote">
              <p>📍 Location pin on map (required for accurate pickup)</p>
              <button type="button" className="mapBtn">
                Select Location on Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Consent */}
      {currentStep === 2 && (
        <div className="formStep">
          <div className="formSection">
            <h3>Terms & Conditions</h3>

            <label className="checkboxLabel">
              <input
                type="checkbox"
                {...register("agreeTerms", {
                  required: "You must agree to the terms and privacy policy",
                })}
              />
              <span>
                I agree to the{" "}
                <a href="/terms" target="_blank">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="error">{errors.agreeTerms.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistrationForm;
