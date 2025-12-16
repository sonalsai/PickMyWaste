import { motion } from "framer-motion";
import "./Stepper.scss";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={index} className="stepWrapper">
          <div className="stepIndicator">
            <motion.div
              className={`stepCircle ${
                index < currentStep ? "completed" : ""
              } ${index === currentStep ? "active" : ""}`}
              initial={false}
              animate={{
                scale: index === currentStep ? 1.1 : 1,
                backgroundColor:
                  index < currentStep
                    ? "#2e7d32"
                    : index === currentStep
                    ? "#2e7d32"
                    : "#e0e0e0",
              }}
              transition={{ duration: 0.3 }}
            >
              {index < currentStep ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.3334 4L6.00002 11.3333L2.66669 8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </motion.div>

            {index < steps.length - 1 && (
              <div className="stepLine">
                <motion.div
                  className="stepLineFill"
                  initial={false}
                  animate={{
                    width: index < currentStep ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>

          <div className="stepLabel">
            <span className={index === currentStep ? "active" : ""}>
              {step}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
