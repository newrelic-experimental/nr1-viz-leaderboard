import React from "react";
import { motion } from "framer-motion";
import { z } from "zod";

import { ProgressBar } from "./ProgressBar";
import { ChangeIndicator } from "./ChangeIndicator";

export const LeaderboardItemSchema = z.object({
  position: z.number().optional(),
  unique_id: z.union([z.number(), z.string()]),
  image_url: z.string(),
  name: z.string(),
  name_heading: z.string().default("Name").optional(),
  name_extra_data: z.string().default("").optional(),
  value: z.number(),
  value_heading: z.string().default("Value").optional(),
  value_display: z.string().default("").optional(),
  progress_percent: z.number(),
  progress_percent_heading: z.string().default("Progress").optional(),
  change: z.number().optional(),
  change_heading: z.string().default("Change").optional(),
  change_display: z.string().default("").optional(),
  comparison: z.union([z.literal("current"), z.literal("previous")]).optional(),
});

export type LeaderboardItemType = z.infer<typeof LeaderboardItemSchema>;

export const LeaderboardItem: React.FC<{ item: LeaderboardItemType }> = ({
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
