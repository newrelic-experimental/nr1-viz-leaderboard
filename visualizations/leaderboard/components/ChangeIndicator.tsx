import React from "react";

type ChangeIndicatorProps = {
  currentValue: number;
  previousValue: number;
};

export const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({
  currentValue,
  previousValue,
}) => {
  const percentageChange =
    previousValue !== 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : 0;

  return (
    <div
      className={`change-indicator ${
        percentageChange > 0
          ? "positive"
          : percentageChange < 0
          ? "negative"
          : "neutral"
      }`}
    >
      {percentageChange.toFixed(2)}%
      {percentageChange > 0 ? (
        <span className="arrow-up">⬆</span>
      ) : percentageChange < 0 ? (
        <span className="arrow-down">⬇</span>
      ) : (
        <span className="no-change">–</span>
      )}
    </div>
  );
};
