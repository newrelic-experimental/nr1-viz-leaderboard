import React from "react";
import { useNerdGraphQuery } from "../hooks/nerdGraph/useNerdGraphQuery";
import { useProps } from "../context/VizPropsProvider";

export type LeaderboardItemProps = {
  position: number;
  imageUrl: string;
  name: string;
  units: number;
  pricePerUnit: number;
  target: number;
  currentValue: number;
  previousValue: number;
};

export type LeaderboardProps = {
  data: LeaderboardItemProps[];
};

const LeaderboardItem: React.FC<{ item: LeaderboardItemProps }> = ({
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

  const percentageChange =
    previousValue !== 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : 0;
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
        <div>({percentageTargetAchieved.toFixed(2)}%)</div>
      </div>

      <div className="leaderboard-item__percentage-change">
        <div>{percentageChange.toFixed(2)}%</div>
        <div>({percentageTargetAchieved.toFixed(2)}% achieved)</div>
      </div>
    </div>
  );
};

type QueryResponse = {
  value: number;
  value_text: string;
  value_heading: string;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ data: items }) => {
  const { query } = useProps();
  const { data, error, lastUpdateStamp } =
    useNerdGraphQuery<QueryResponse>(query);

  console.log("data", data);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="leaderboard-item__position"></div>
        <div className="leaderboard-item__image">Image</div>
        <div className="leaderboard-item__name-units">Name & Units</div>
        <div className="leaderboard-item__progress">Progress</div>
        <div className="leaderboard-item__percentage-change">Change</div>
      </div>
      <div className="leaderboard-rows">
        {items.map((item: LeaderboardItemProps) => (
          <LeaderboardItem key={item.position} item={item} />
        ))}
      </div>
    </div>
  );
};
