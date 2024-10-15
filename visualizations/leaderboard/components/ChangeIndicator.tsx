import React from "react";
import FlipNumbers from "react-flip-numbers";
import { motion } from "framer-motion";

export const ChangeIndicator: React.FC<{
  change: number;
  changeUnits: string;
}> = ({ change, changeUnits }) => {
  if (!change) {
    return null;
  }

  return (
    <div className="change-indicator-wrapper">
      <div
        className={`change-indicator ${
          change > 0 ? "positive" : change < 0 ? "negative" : "neutral"
        }`}
      >
        <FlipNumbers
          height={15}
          width={15}
          color="black"
          background="white"
          play
          perspective={100}
          numbers={change.toFixed(2)}
        />
        <span>{changeUnits}</span>
        {change > 0 ? (
          <motion.span
            className="arrow-up"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ⬆
          </motion.span>
        ) : change < 0 ? (
          <motion.span
            className="arrow-down"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ⬇
          </motion.span>
        ) : (
          <span className="no-change">–</span>
        )}
      </div>
    </div>
  );
};
