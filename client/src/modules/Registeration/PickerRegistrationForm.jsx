import { useForm } from "react-hook-form";
import { useState } from "react";
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

const PickerRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [idType, setIdType] = useState("aadhaar");
  const [formData, setFormData] = useState({});

  const password = watch("password");

  const steps = [
    "Personal Info",
    "Service Area",
    "Availability",
    "Verification",
    "Consent",
  ];

  const onNext = async () => {
    let fieldsToValidate = [];

    switch (currentStep) {
      case 0:
        fieldsToValidate = [
          "fullName",
          "mobile",
          "password",
          "confirmPassword",
        ];
        break;
      case 1:
        fieldsToValidate = ["city", "operatingArea"];
        break;
      case 2:
        // Availability fields are optional checkboxes
        break;
      case 3:
        fieldsToValidate = ["idType", "idNumber", "idDocument"];
        break;
      default:
        break;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    console.log("Picker Registration:", { ...formData, ...data });
    // API call here
  };

  return (
    <form className="registrationForm" onSubmit={handleSubmit(onSubmit)}>
      {/* Step 0: Personal Information */}
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
              id="mobile"
              label="Mobile Number (Primary Contact)"
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

            <TextField
              id="email"
              label="Email Address (Optional)"
              type="email"
              autoComplete="email"
              icon={<FiMail />}
              error={errors.email?.message}
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
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

      {/* Step 1: Service Area */}
      {currentStep === 1 && (
        <div className="formStep">
          <div className="formSection">
            <h3>Service Area</h3>

            <TextField
              id="city"
              label="City"
              icon={<FiMap />}
              error={errors.city?.message}
              {...register("city", { required: "City is required" })}
            />

            <TextField
              id="operatingArea"
              label="Primary Operating Area (Locality/Zone)"
              icon={<FiMapPin />}
              error={errors.operatingArea?.message}
              {...register("operatingArea", {
                required: "Operating area is required",
              })}
            />

            <div className="mapPinNote">
              <p>📍 Base location pin (required)</p>
              <button type="button" className="mapBtn">
                Select Location on Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Work Availability */}
      {currentStep === 2 && (
        <div className="formStep">
          <div className="formSection">
            <h3>Work Availability</h3>

            <div className="checkboxGroup">
              <label>Available Days:</label>
              <div className="checkboxOptions">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    value="weekdays"
                    {...register("availableDays")}
                  />
                  <span>Weekdays</span>
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    value="weekends"
                    {...register("availableDays")}
                  />
                  <span>Weekends</span>
                </label>
              </div>
            </div>

            <div className="checkboxGroup">
              <label>Time Slots:</label>
              <div className="checkboxOptions">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    value="morning"
                    {...register("timeSlots")}
                  />
                  <span>Morning (6 AM - 12 PM)</span>
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    value="afternoon"
                    {...register("timeSlots")}
                  />
                  <span>Afternoon (12 PM - 6 PM)</span>
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    value="fullday"
                    {...register("timeSlots")}
                  />
                  <span>Full Day (6 AM - 6 PM)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Verification */}
      {currentStep === 3 && (
        <div className="formStep">
          <div className="formSection">
            <h3>Verification Documents</h3>
            <p className="sectionNote">
              ⚠️ Admin approval required. Documents will be verified later.
            </p>

            <div className="radioGroup compact">
              <label
                className={`radioCard ${
                  idType === "aadhaar" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  value="aadhaar"
                  {...register("idType", { required: true })}
                  checked={idType === "aadhaar"}
                  onChange={(e) => setIdType(e.target.value)}
                />
                <div className="radioContent">
                  <span className="radioTitle">Aadhaar</span>
                </div>
              </label>

              <label
                className={`radioCard ${
                  idType === "license" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  value="license"
                  {...register("idType", { required: true })}
                  checked={idType === "license"}
                  onChange={(e) => setIdType(e.target.value)}
                />
                <div className="radioContent">
                  <span className="radioTitle">Driving License</span>
                </div>
              </label>

              <label
                className={`radioCard ${idType === "voter" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  value="voter"
                  {...register("idType", { required: true })}
                  checked={idType === "voter"}
                  onChange={(e) => setIdType(e.target.value)}
                />
                <div className="radioContent">
                  <span className="radioTitle">Voter ID</span>
                </div>
              </label>
            </div>

            <TextField
              id="idNumber"
              label="ID Number"
              icon={<FiFileText />}
              error={errors.idNumber?.message}
              {...register("idNumber", {
                required: "ID number is required",
                minLength: { value: 6, message: "Invalid ID number" },
              })}
            />

            <div className="fileUpload">
              <label htmlFor="idUpload">Upload ID Document (Image/PDF)</label>
              <input
                id="idUpload"
                type="file"
                accept="image/*,application/pdf"
                {...register("idDocument", {
                  required: "ID document is required",
                })}
              />
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
          <div className="formSection">
            <h3>Terms & Conditions</h3>

            <label className="checkboxLabel">
              <input
                type="checkbox"
                {...register("agreeTerms", {
                  required: "You must agree to the terms",
                })}
              />
              <span>
                I agree to the{" "}
                <a href="/terms" target="_blank">
                  Terms & Conditions
                </a>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="error">{errors.agreeTerms.message}</p>
            )}

            <label className="checkboxLabel">
              <input
                type="checkbox"
                {...register("consentLocation", {
                  required: "Location consent is required",
                })}
              />
              <span>I consent to location tracking for service delivery</span>
            </label>
            {errors.consentLocation && (
              <p className="error">{errors.consentLocation.message}</p>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="formActions">
        {currentStep > 0 && (
          <button type="button" onClick={onPrevious} className="prevBtn">
            ← Previous
          </button>
        )}

        {currentStep < steps.length - 1 ? (
          <button type="button" onClick={onNext} className="nextBtn">
            Next →
          </button>
        ) : (
          <button type="submit" className="submitBtn">
            Submit Application
          </button>
        )}
      </div>
    </form>
  );
};

export default PickerRegistrationForm;
