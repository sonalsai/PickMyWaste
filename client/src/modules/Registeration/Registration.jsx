import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../shared/components/Navbar/Navbar";
import UserRegistrationForm from "./UserRegistrationForm";
import PickerRegistrationForm from "./PickerRegistrationForm";
import AuthenticationSvg from "../../assets/images/undraw_authentication.svg";
import DeliveryTruckSvg from "../../assets/images/undraw_delivery-truck.svg";
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
    formState: { errors },
  } = useForm();

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

  const currentSteps = selectedRole ? steps[selectedRole] : [];

  const onNext = async () => {
    let fieldsToValidate = [];

    if (selectedRole === "user") {
      switch (currentStep) {
        case 0:
          fieldsToValidate = [
            "fullName",
            "email",
            "mobile",
            "password",
            "confirmPassword",
          ];
          break;
        case 1:
          fieldsToValidate = ["addressLine1", "city", "state", "pincode"];
          break;
        case 2:
          // Location marking step - validate location is selected
          if (!selectedLocation) {
            return; // Don't proceed if no location selected
          }
          fieldsToValidate = [];
          break;
        default:
          break;
      }
    } else if (selectedRole === "picker") {
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
        case 3:
          fieldsToValidate = ["idType", "idNumber", "idDocument"];
          break;
        default:
          break;
      }
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid && currentStep < currentSteps.length - 1) {
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
            <img src={AuthenticationSvg} alt="Registration" />
            <p className="bannerText">Join our waste management network</p>
          </motion.div>

          <motion.div
            className="banner"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={bannerVariants}
          >
            <img src={DeliveryTruckSvg} alt="Service" />
            <p className="bannerText">
              Making waste management easier for everyone
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
                    ← Previous
                  </button>
                )}

                {currentStep < currentSteps.length - 1 ? (
                  <button
                    type="button"
                    onClick={onNext}
                    className="nextBtn"
                    disabled={currentStep === 2 && !selectedLocation}
                  >
                    {currentStep === 2 && !selectedLocation
                      ? "Select location to continue"
                      : "Continue →"}
                  </button>
                ) : (
                  <button type="submit" className="submitBtn">
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
