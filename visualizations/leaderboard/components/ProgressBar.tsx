import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  let progressBarClass = "progress-bar__fill--green";
  if (percentage < 50) {
    progressBarClass = "progress-bar__fill--amber";
  }
  if (percentage < 25) {
    progressBarClass = "progress-bar__fill--red";
  }

  return (
    <div className="progress-bar" style={{ height: "15px" }}>
      <motion.div
        className={`progress-bar__fill ${progressBarClass}`}
        style={{ height: "100%" }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1 }}
      ></motion.div>
      <div className="progress-bar__value">{percentage.toFixed(2)}%</div>
    </div>
  );
};
