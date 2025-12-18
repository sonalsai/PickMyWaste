import TextField from "../../shared/components/TextField/TextField";
import PasswordField from "../../shared/components/PasswordField/PasswordField";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiMap,
  FiMapPin,
  FiFileText,
} from "react-icons/fi";
import "./RegistrationForm.scss";

const PickerRegistrationForm = ({
  currentStep,
  register,
  errors,
  watch,
  totalSteps,
}) => {
  const password = watch("password");

  return (
    <div className="formContent">
      {/* Step 0: Personal Information */}
      {currentStep === 0 && (
        <div className="formStep">
          <div className="formSection">
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
                  message: "Invalid mobile number (10 digits)",
                },
              })}
            />

            <div className="formRow">
              <PasswordField
                id="password"
                label="Create Password"
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
        </div>
      )}

      {/* Step 1: Service Area */}
      {currentStep === 1 && (
        <div className="formStep">
          <div className="formSection">
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>

            <TextField
              id="city"
              label="Preferred City"
              icon={<FiMap />}
              placeholder="e.g. Bengaluru"
              error={errors.city?.message}
              {...register("city", { required: "City is required" })}
            />

            <TextField
              id="operatingArea"
              label="Service Area / Locality"
              icon={<FiMapPin />}
              placeholder="e.g. Indiranagar, HSR Layout"
              error={errors.operatingArea?.message}
              {...register("operatingArea", {
                required: "Service area is required",
              })}
            />
          </div>
        </div>
      )}

      {/* Step 2: Availability */}
      {currentStep === 2 && (
        <div className="formStep">
          <div className="formSection">
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>

            <div className="checkboxGroup">
              <label>Available Days</label>
              <div className="checkboxOptions">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <label key={day} className="checkboxLabel">
                    <input
                      type="checkbox"
                      {...register("availability")}
                      value={day}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Verification */}
      {currentStep === 3 && (
        <div className="formStep">
          <div className="formSection">
            <div className="stepIndicator">
              <span className="stepNumber">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>

            <div className="radioGroup">
              <label
                className={`radioCard ${
                  watch("idType") === "aadhaar" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  {...register("idType")}
                  value="aadhaar"
                  defaultChecked
                />
                <div className="radioContent">
                  <span className="radioTitle">Aadhaar Card</span>
                  <span className="radioDesc">Verification via UIDAI</span>
                </div>
              </label>

              <label
                className={`radioCard ${
                  watch("idType") === "voter" ? "selected" : ""
                }`}
              >
                <input type="radio" {...register("idType")} value="voter" />
                <div className="radioContent">
                  <span className="radioTitle">Voter ID</span>
                  <span className="radioDesc">Election Commission ID</span>
                </div>
              </label>
            </div>

            <TextField
              id="idNumber"
              label="ID Card Number"
              icon={<FiFileText />}
              error={errors.idNumber?.message}
              {...register("idNumber", { required: "ID number is required" })}
            />
          </div>
        </div>
      )}

      {/* Step 4: Consent */}
      {currentStep === 4 && (
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
                    required: "You must agree to the terms",
                  })}
                />
                <span className="checkboxText">
                  I agree to the Terms & Conditions and Privacy Policy
                </span>
              </label>

              <label className="checkboxLabel">
                <input
                  type="checkbox"
                  {...register("consentLocation", {
                    required: "Location consent is required",
                  })}
                />
                <span className="checkboxText">
                  I consent to location tracking for service delivery
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

            {(errors.agreeTerms || errors.consentLocation) && (
              <p className="error">
                {errors.agreeTerms?.message || errors.consentLocation?.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PickerRegistrationForm;
