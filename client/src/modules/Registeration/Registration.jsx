import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../shared/components/Navbar/Navbar";
import UserRegistrationForm from "./UserRegistrationForm";
import PickerRegistrationForm from "./PickerRegistrationForm";
import PersonalInfoSvg from "../../assets/images/undraw_personal-information.svg";
import CleanUpSvg from "../../assets/images/undraw_clean-up.svg";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Registration.scss";

const Registration = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("user"); // Auto-select user
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const steps = {
    user: ["Account Info", "Address Details", "Location Marking", "Consent"],
    picker: [
      "Personal Info",
      "Service Area",
      "Availability",
      "Verification",
      "Consent",
    ],
  };

  // Field names mapping for each step to handle validation blocking
  const stepFields = {
    user: [
      ["fullName", "email", "mobile", "password", "confirmPassword"],
      ["addressLine1", "city", "state", "pincode"],
      [], // Location Marking (handled via selectedLocation state)
      ["agreeTerms"],
    ],
    picker: [
      ["fullName", "mobile", "password", "confirmPassword"],
      ["city", "operatingArea"],
      [], // Availability (optional checkboxes)
      ["idType", "idNumber"],
      ["agreeTerms", "consentLocation"],
    ],
  };

  const currentSteps = selectedRole ? steps[selectedRole] : [];

  const isStepDisabled = () => {
    if (!selectedRole) return true;

    const fields = stepFields[selectedRole][currentStep];

    // Special case for User Location Step
    if (selectedRole === "user" && currentStep === 2) {
      return !selectedLocation;
    }

    // For other steps, check if all fields have values and no errors
    if (fields && fields.length > 0) {
      const formValues = watch(fields);
      // Check if any field is empty
      const isComplete = fields.every((field) => {
        const val = watch(field);
        return val && val.toString().trim().length > 0;
      });

      // Check if any current field has an error
      const hasErrors = fields.some((field) => !!errors[field]);

      return !isComplete || hasErrors;
    }

    return false;
  };

  const onNext = async () => {
    const fieldsToValidate = stepFields[selectedRole][currentStep];

    const isValidStep =
      fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true;

    if (isValidStep && currentStep < currentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    console.log(`${selectedRole} Registration:`, data);
    // API call here
    if (selectedRole === "user") {
      // Add coordinates to submission
      data.coordinates = selectedLocation.coordinates;
      data.formattedAddress = selectedLocation.address;
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentStep(0); // Reset to first step when role changes
  };

  const bannerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: custom * 0.2 },
    }),
  };

  return (
    <div className="registrationPage">
      <Navbar showLinks={true} buttonText="Sign In" buttonLink="/login" />

      <main>
        {/* Left Banner Section */}
        <div className="bannerSection">
          <motion.div
            className="banner"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={bannerVariants}
          >
            <img src={PersonalInfoSvg} alt="Registration" />
            <p className="bannerText">Create your account in minutes</p>
          </motion.div>

          <motion.div
            className="banner"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={bannerVariants}
          >
            <img src={CleanUpSvg} alt="Service" />
            <p className="bannerText">
              Cleaner surroundings, better waste handling
            </p>
          </motion.div>
        </div>

        {/* Right Form Section */}
        <div className="formSection">
          <div className="formCard">
            {/* Role Selection */}
            <div className="roleSelector">
              <label
                className={`roleOption ${
                  selectedRole === "user" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={selectedRole === "user"}
                  onChange={() => handleRoleChange("user")}
                />
                <span>User</span>
              </label>

              <label
                className={`roleOption ${
                  selectedRole === "picker" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="picker"
                  checked={selectedRole === "picker"}
                  onChange={() => handleRoleChange("picker")}
                />
                <span>Picker</span>
              </label>
            </div>

            {/* Dynamic Form Based on Role */}
            <form
              className="registrationForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <AnimatePresence mode="wait">
                {selectedRole === "user" && (
                  <motion.div
                    key="user"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <UserRegistrationForm
                      currentStep={currentStep}
                      register={register}
                      errors={errors}
                      watch={watch}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                      totalSteps={currentSteps.length}
                      stepName={currentSteps[currentStep]}
                    />
                  </motion.div>
                )}

                {selectedRole === "picker" && (
                  <motion.div
                    key="picker"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PickerRegistrationForm
                      currentStep={currentStep}
                      register={register}
                      errors={errors}
                      watch={watch}
                      totalSteps={currentSteps.length}
                      stepName={currentSteps[currentStep]}
                    />
                  </motion.div>
                )}

                {!selectedRole && (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="selectRolePlaceholder"
                  >
                    <p>Please select a registration type to continue</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="formActions">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="prevBtn"
                  >
                    <FiChevronLeft /> Previous
                  </button>
                )}

                {currentStep < currentSteps.length - 1 ? (
                  <button
                    type="button"
                    onClick={onNext}
                    className="nextBtn"
                    disabled={isStepDisabled()}
                  >
                    {selectedRole === "user" &&
                    currentStep === 2 &&
                    !selectedLocation ? (
                      "Select location to continue"
                    ) : (
                      <>
                        Continue <FiChevronRight />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="submitBtn"
                    disabled={isStepDisabled()}
                  >
                    Create Account
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
