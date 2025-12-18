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
  FiNavigation,
  FiSearch,
  FiArrowUpRight,
} from "react-icons/fi";
import currentLocationSvg from "../../assets/images/undraw_current-location.svg";
import myCurrenrLocationSvg from "../../assets/images/undraw_my-current-location.svg";
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
  const handleSelectManual = () => {
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
          <div className="locationStepContainer">
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>
            {!selectedLocation ? (
              <>
                <div className="illustrationArea">
                  <img
                    src={currentLocationSvg}
                    alt="Current Location"
                    className="locationIllustration"
                  />
                </div>

                <div className="selectionText">
                  <h3>Choose your location</h3>
                  <p>and start recycling with us</p>
                </div>

                <div className="selectionActions">
                  <button
                    type="button"
                    className="useCurrentBtn"
                    onClick={handleUseCurrentLocation}
                  >
                    <FiNavigation /> Use My Current Location
                  </button>

                  <button
                    type="button"
                    className="selectManualLink"
                    onClick={handleSelectManual}
                  >
                    Select It Manually
                  </button>
                </div>
              </>
            ) : (
              <div className="selectedLocationCard">
                <div className="illustrationArea">
                  <img
                    src={myCurrenrLocationSvg}
                    alt="Delivery Location"
                    className="locationIllustration"
                  />
                </div>
                <div className="cardHeader">
                  <FiMapPin />
                  <h4>Location Selected</h4>
                </div>
                <div className="cardContent">
                  <p className="address">{selectedLocation.address}</p>
                  <p className="city">{selectedLocation.city}</p>
                  <div className="accuracy">
                    <span>Accuracy: {selectedLocation.accuracy}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="changeBtn"
                  onClick={handleChangeLocation}
                >
                  Change Location
                </button>
                <div className="successBadge">✓ Ready to proceed</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Consent */}
      {currentStep === 3 && (
        <div className="formStep">
          <div className="consentContainer">
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>
            <h3>Terms & Privacy</h3>

            <div className="consentContent">
              <label className="checkboxLabel">
                <input
                  type="checkbox"
                  {...register("agreeTerms", {
                    required: "You must agree to the terms and privacy policy",
                  })}
                />
                <span className="checkboxText">
                  I agree to the Terms & Conditions and Privacy Policy
                </span>
              </label>

              <div className="descriptionBox">
                <p className="consentDescription">
                  By creating an account, you confirm your details are accurate
                  and agree to use Pick My Waste responsibly. You also consent
                  to the use of your information for service coordination and
                  communication.
                </p>
              </div>

              <div className="trustLine">
                <span className="trustIcon">🔒</span>
                <p>
                  Your data stays private and is used only to provide our
                  services.
                </p>
              </div>
            </div>

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
