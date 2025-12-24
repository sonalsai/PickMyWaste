import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import styles from "./Snackbar.module.scss";
import { snackbarService } from "../../../services/snackbarService";

const Snackbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  useEffect(() => {
    // Register the listener
    snackbarService.setListener((msg, msgType) => {
      setMessage(msg);
      setType(msgType);
      setIsOpen(true);
    });

    // Cleanup
    return () => snackbarService.setListener(null);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000); // Auto hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const icons = {
    success: <FiCheckCircle className={styles.icon} color="#2E7D32" />,
    error: <FiAlertCircle className={styles.icon} color="#D32F2F" />,
    warning: <FiAlertCircle className={styles.icon} color="#ED6C02" />,
    info: <FiInfo className={styles.icon} color="#0288D1" />,
  };

  const colors = {
    success: "#E8F5E9",
    error: "#FFEBEE",
    warning: "#FFF3E0",
    info: "#E1F5FE",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.9,
            x: "-50%",
            transition: { duration: 0.2 },
          }}
          className={styles.snackbar}
          style={{ backgroundColor: colors[type] || colors.info }}
        >
          <div className={styles.content}>
            {icons[type] || icons.info}
            <span className={styles.message} style={{ color: "#1F2937" }}>
              {message}
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
            <FiX />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
