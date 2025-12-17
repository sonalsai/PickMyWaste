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

const UserRegistrationForm = ({
  currentStep,
  register,
  errors,
  watch,
  selectedLocation,
  setSelectedLocation,
  totalSteps,
  stepName,
}) => {
  const password = watch("password");

  // Mock function to simulate location selection
  const handleSelectLocation = () => {
    // This would open a map modal in real implementation
    // For now, we'll simulate a location selection
    setSelectedLocation({
      address: "MG Road, Indiranagar",
      city: "Bengaluru",
      accuracy: "High",
      coordinates: { lat: 12.9716, lng: 77.5946 },
    });
  };

  const handleUseCurrentLocation = () => {
    // This would use geolocation API in real implementation
    setSelectedLocation({
      address: "Current Location",
      city: "Bengaluru",
      accuracy: "High",
      coordinates: { lat: 12.9716, lng: 77.5946 },
    });
  };

  const handleChangeLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="formContent">
      {/* Step 0: Account Information */}
      {currentStep === 0 && (
        <div className="formStep">
          <div className="formSection">
            {/* Step Indicator */}
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="stepDivider">—</span>
              <span className="stepTitle">{stepName}</span>
            </div>

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
            {/* Step Indicator */}
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="stepDivider">—</span>
              <span className="stepTitle">{stepName}</span>
            </div>

            <TextField
              id="addressLine1"
              label="Address Line 1"
              icon={<FiMapPin />}
              error={errors.addressLine1?.message}
              {...register("addressLine1", {
                required: "Address Line 1 is required",
                minLength: {
                  value: 5,
                  message: "Please enter a complete address",
                },
              })}
            />

            <TextField
              id="addressLine2"
              label="Address Line 2 (Optional)"
              icon={<FiMapPin />}
              error={errors.addressLine2?.message}
              {...register("addressLine2")}
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
                id="state"
                label="State"
                icon={<FiMap />}
                error={errors.state?.message}
                {...register("state", { required: "State is required" })}
              />
            </div>

            <TextField
              id="pincode"
              label="Pincode"
              icon={<FiMapPin />}
              error={errors.pincode?.message}
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Invalid pincode (must be 6 digits)",
                },
              })}
            />
          </div>
        </div>
      )}

      {/* Step 2: Location Marking */}
      {currentStep === 2 && (
        <div className="formStep">
          <div className="formSection locationSection">
            {/* Step Indicator */}
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="stepDivider">—</span>
              <span className="stepTitle">{stepName}</span>
            </div>

            {!selectedLocation ? (
              <>
                {/* Improved Microcopy - Benefit Driven */}
                <div className="locationInstructions">
                  <FiMapPin className="instructionIcon" />
                  This helps our picker reach you without calls or delays
                </div>

                {/* Primary CTA */}
                <div className="locationActions">
                  <button
                    type="button"
                    className="locationBtn primary"
                    onClick={handleSelectLocation}
                  >
                    <FiMapPin />
                    Select Pickup Location
                  </button>

                  {/* Secondary Option */}
                  <button
                    type="button"
                    className="locationBtn secondary"
                    onClick={handleUseCurrentLocation}
                  >
                    <FiMap />
                    Use Current Location
                  </button>
                </div>

                {/* Trust Signal */}
                <div className="trustSignal">
                  🔒 Location is used only for pickup coordination
                </div>
              </>
            ) : (
              <>
                {/* Location Confirmation Card */}
                <div className="locationConfirmation">
                  <div className="confirmationHeader">
                    <FiMapPin className="confirmIcon" />
                    <h4>Pickup Location Selected</h4>
                  </div>

                  <div className="locationDetails">
                    <p className="locationAddress">
                      <strong>Near:</strong> {selectedLocation.address},{" "}
                      {selectedLocation.city}
                    </p>
                    <p className="locationAccuracy">
                      <strong>Accuracy:</strong>{" "}
                      <span className="accuracyBadge">
                        {selectedLocation.accuracy}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="changeLocationBtn"
                    onClick={handleChangeLocation}
                  >
                    Change Location
                  </button>
                </div>

                {/* Success Tip */}
                <div className="locationTip success">
                  ✓ Great! Your picker will find you easily
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Consent */}
      {currentStep === 3 && (
        <div className="formStep">
          <div className="formSection">
            {/* Step Indicator */}
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span className="stepDivider">—</span>
              <span className="stepTitle">{stepName}</span>
            </div>

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
