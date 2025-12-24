import React, { useEffect, useState } from "react";
import styles from "./Loader.module.scss";
import { loaderService } from "../../../services/loaderService";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loaderService.setListener((loading) => {
      setIsLoading(loading);
    });
    return () => loaderService.setListener(null);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;
