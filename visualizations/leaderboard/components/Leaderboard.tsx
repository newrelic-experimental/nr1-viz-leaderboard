import React from "react";

import { useNerdGraphQuery } from "../hooks/nerdGraph/useNerdGraphQuery";
import { useProps } from "../context/VizPropsProvider";

import { LeaderboardItem, LeaderboardItemProps } from "./LeaderboardItem";

export type LeaderboardProps = {
  data: LeaderboardItemProps[];
};

type QueryResponse = {
  value: number;
  value_text: string;
  value_heading: string;
  image_url: string;
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
