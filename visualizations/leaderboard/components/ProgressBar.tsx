import React from "react";

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
      <div
        className={`progress-bar__fill ${progressBarClass}`}
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="progress-bar__value">{percentage.toFixed(2)}%</div>
    </div>
  );
};
