import React from "react";
import { motion } from "framer-motion";
import { ProgressBar } from "./ProgressBar";
import { ChangeIndicator } from "./ChangeIndicator";

export type LeaderboardItemProps = {
  position?: number; // keep it for default sorting
  unique_id?: number | string;

  image_url: string;

  name: string; // name of an item
  name_heading: string;
  name_extra_data: string; // e.g. units @ £price_per_unit

  value: number;
  value_heading: string;
  value_display: string;

  progress_percent: number;
  progress_percent_heading: string;

  change: number; // e.g. 3
  change_heading: string;
  change_display: string; // e.g. 3%

  comparison?: "current" | "previous";
};

export const LeaderboardItem: React.FC<{ item: LeaderboardItemProps }> = ({
  item,
}) => {
  const {
    position,
    image_url,
    name,
    name_extra_data,
    value_display,
    progress_percent,
    change,
    change_display,
  } = item;

  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__position">{position}</div>

      <div className="leaderboard-item__image">
        <img src={image_url} alt={name} />
      </div>

      <div className="leaderboard-item__name-units">
        <div>
          <strong>{name}</strong>
        </div>
        <div>{name_extra_data}</div>
      </div>

      <div className="leaderboard-item__value">
        <motion.div
          key={value_display}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
          }}
        >
          {value_display}
        </motion.div>
      </div>

      <div className="leaderboard-item__progress">
        <ProgressBar percentage={progress_percent} />
      </div>

      {change && (
        <div className="leaderboard-item__percentage-change">
          <ChangeIndicator change={change} changeUnits={change_display} />
        </div>
      )}
    </div>
  );
};
