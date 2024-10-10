import React from "react";
import FlipNumbers from "react-flip-numbers";
import { motion } from "framer-motion";

export const ChangeIndicator: React.FC<{
  currentValue: number;
  previousValue: number;
}> = ({ currentValue, previousValue }) => {
  const percentageChange =
    previousValue !== 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : 0;

  return (
    <div className="change-indicator-wrapper">
      <div
        className={`change-indicator ${
          percentageChange > 0
            ? "positive"
            : percentageChange < 0
            ? "negative"
            : "neutral"
        }`}
      >
        <FlipNumbers
          height={15}
          width={15}
          color="black"
          background="white"
          play
          perspective={100}
          numbers={percentageChange.toFixed(2)}
        />
        %
        {percentageChange > 0 ? (
          <motion.span
            className="arrow-up"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ⬆
          </motion.span>
        ) : percentageChange < 0 ? (
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
