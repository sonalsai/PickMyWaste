import { useEffect } from "react";
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
  FiX,
} from "react-icons/fi";
import "./RegistrationForm.scss";

const PickerRegistrationForm = ({
  currentStep,
  register,
  errors,
  watch,
  setValue,
  totalSteps,
}) => {
  const password = watch("password");
  const availabilityType = watch("availabilityType");
  const availability = watch("availability") || [];

  // Handle availability quick-select (radio -> checkboxes)
  useEffect(() => {
    if (availabilityType === "all") {
      setValue("availability", [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]);
    } else if (availabilityType === "weekdays") {
      setValue("availability", [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ]);
    } else if (availabilityType === "weekends") {
      setValue("availability", ["Saturday", "Sunday"]);
    }
    // For "custom", don't auto-set anything
  }, [availabilityType, setValue]);

  // Auto-update radio selection based on manual checkbox changes
  useEffect(() => {
    const selectedDays = availability;
    const allDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const weekends = ["Saturday", "Sunday"];

    // Check if all days are selected
    if (
      selectedDays.length === 7 &&
      allDays.every((day) => selectedDays.includes(day))
    ) {
      if (availabilityType !== "all") {
        setValue("availabilityType", "all");
      }
    }
    // Check if only weekdays are selected
    else if (
      selectedDays.length === 5 &&
      weekdays.every((day) => selectedDays.includes(day)) &&
      !selectedDays.includes("Saturday") &&
      !selectedDays.includes("Sunday")
    ) {
      if (availabilityType !== "weekdays") {
        setValue("availabilityType", "weekdays");
      }
    }
    // Check if only weekends are selected
    else if (
      selectedDays.length === 2 &&
      weekends.every((day) => selectedDays.includes(day)) &&
      !weekdays.some((day) => selectedDays.includes(day))
    ) {
      if (availabilityType !== "weekends") {
        setValue("availabilityType", "weekends");
      }
    }
    // Otherwise, it's custom
    else if (selectedDays.length > 0 && availabilityType !== "custom") {
      setValue("availabilityType", "custom");
    }
  }, [availability, availabilityType, setValue]);

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
                  message: "Invalid mobile number (10 digits)",
                },
              })}
            />

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
              label="City"
              icon={<FiMap />}
              error={errors.city?.message}
              {...register("city", { required: "City is required" })}
            />

            <TextField
              id="operatingArea"
              label="Preferred Localities"
              icon={<FiMapPin />}
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

            <div className="availabilitySelector">
              <label className="quickSelectLabel">Quick Select:</label>
              <div className="radioGroup compact">
                <label
                  className={`radioCard ${
                    watch("availabilityType") === "all" ? "selected" : ""
                  }`}
                  onClick={() => {
                    const allDays = [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ];
                    // This will be handled by the parent component
                  }}
                >
                  <input
                    type="radio"
                    {...register("availabilityType")}
                    value="all"
                  />
                  <div className="radioContent">
                    <span className="radioTitle">All Days</span>
                  </div>
                </label>

                <label
                  className={`radioCard ${
                    watch("availabilityType") === "weekdays" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    {...register("availabilityType")}
                    value="weekdays"
                  />
                  <div className="radioContent">
                    <span className="radioTitle">Weekdays</span>
                  </div>
                </label>

                <label
                  className={`radioCard ${
                    watch("availabilityType") === "weekends" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    {...register("availabilityType")}
                    value="weekends"
                  />
                  <div className="radioContent">
                    <span className="radioTitle">Weekends</span>
                  </div>
                </label>

                <label
                  className={`radioCard ${
                    watch("availabilityType") === "custom" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    {...register("availabilityType")}
                    value="custom"
                    defaultChecked
                  />
                  <div className="radioContent">
                    <span className="radioTitle">Custom</span>
                  </div>
                </label>
              </div>
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
                  <span className="radioDesc">12-digit unique ID</span>
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

              <label
                className={`radioCard ${
                  watch("idType") === "pan" ? "selected" : ""
                }`}
              >
                <input type="radio" {...register("idType")} value="pan" />
                <div className="radioContent">
                  <span className="radioTitle">PAN Card</span>
                  <span className="radioDesc">Permanent Account Number</span>
                </div>
              </label>
            </div>

            <TextField
              id="idNumber"
              label={`${
                watch("idType") === "aadhaar"
                  ? "Aadhaar"
                  : watch("idType") === "voter"
                  ? "Voter ID"
                  : "PAN"
              } Number`}
              icon={<FiFileText />}
              error={errors.idNumber?.message}
              {...register("idNumber", { required: "ID number is required" })}
            />

            <div className="fileUploadField">
              <label htmlFor="idDocument" className="fileUploadLabel">
                <FiFileText className="uploadIcon" />
                <span className="uploadText">
                  Upload{" "}
                  {watch("idType") === "aadhaar"
                    ? "Aadhaar"
                    : watch("idType") === "voter"
                    ? "Voter ID"
                    : "PAN"}{" "}
                  Document
                </span>
                <span className="uploadHint">PDF, JPG, or PNG (Max 5MB)</span>
              </label>
              <input
                type="file"
                id="idDocument"
                accept=".pdf,.jpg,.jpeg,.png"
                {...register("idDocument", {
                  required: "Please upload your ID document",
                })}
                className="fileInput"
              />
              {watch("idDocument")?.[0] && (
                <div className="fileName">
                  <div className="fileNameContent">
                    <FiFileText />
                    <span>{watch("idDocument")[0].name}</span>
                  </div>
                  <button
                    type="button"
                    className="removeFileBtn"
                    onClick={() => setValue("idDocument", null)}
                    aria-label="Remove file"
                  >
                    <FiX />
                  </button>
                </div>
              )}
              {errors.idDocument && (
                <p className="error">{errors.idDocument.message}</p>
              )}
            </div>
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
