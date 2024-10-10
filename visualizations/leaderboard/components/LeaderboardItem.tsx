import React from "react";

import { ProgressBar } from "./ProgressBar";
import { ChangeIndicator } from "./ChangeIndicator";

export type LeaderboardItemProps = {
  position?: number;
  imageUrl: string;
  name: string;
  units: number;
  pricePerUnit: number;
  target: number;
  currentValue: number;
  previousValue: number;
};

export const LeaderboardItem: React.FC<{ item: LeaderboardItemProps }> = ({
  item,
}) => {
  const {
    position,
    imageUrl,
    name,
    units,
    pricePerUnit,
    target,
    currentValue,
    previousValue,
  } = item;

  const percentageTargetAchieved =
    target !== 0 ? (currentValue / target) * 100 : 0;

  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__position">{position}</div>

      <div className="leaderboard-item__image">
        <img src={imageUrl} alt={name} />
      </div>

      <div className="leaderboard-item__name-units">
        <div>
          <strong>{name}</strong>
        </div>
        <div>
          {units} units @ £{pricePerUnit.toFixed(2)}
        </div>
      </div>

      <div className="leaderboard-item__progress">
        <div>
          {currentValue} / {target}
        </div>
        <ProgressBar percentage={percentageTargetAchieved} />
      </div>

      <div className="leaderboard-item__percentage-change">
        <ChangeIndicator
          currentValue={currentValue}
          previousValue={previousValue}
        />
      </div>
    </div>
  );
};
