import React from "react";
import { motion } from "framer-motion";
import { z } from "zod";

import { ProgressBar } from "./ProgressBar";
import { ChangeIndicator } from "./ChangeIndicator";
import { NameUnits } from "./NameUnits";
import { Position } from "../../../shared/Position/Position";
import { ImageWithFallback } from "../../../shared/ImageWithFallBack/ImageWithFallback";

export const LeaderboardItemSchema = z.object({
  position: z.number().optional(),
  unique_id: z.union([z.number(), z.string()]),
  image_url: z.string().optional(),
  name: z.string(),
  full_name: z.string().optional(),
  name_heading: z.string().optional().default("Name"),
  name_extra_data: z.string().optional().default(""),
  link: z.string().optional().default(""),
  value: z.number(),
  value_heading: z.string().optional().default("Value"),
  value_display: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (val !== undefined ? String(val) : undefined)),
  progress_percent: z.number().optional(),
  progress_percent_heading: z.string().optional().default("Progress"),
  change: z.number().optional(),
  change_heading: z.string().optional().default("Change"),
  change_display: z.string().default("%"),
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
    full_name,
    link,
    name_extra_data,
    value,
    value_display,
    progress_percent,
    change,
    change_display,
  } = item;

  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__position">
        <Position position={position} />
      </div>

      {image_url !== undefined && (
        <div className="leaderboard-item__image">
          <ImageWithFallback src={image_url} alt={name} />
        </div>
      )}

      <div className="leaderboard-item__name-units">
        <NameUnits
          name={name}
          link={link}
          name_extra_data={name_extra_data}
          full_name={full_name}
        />
      </div>

      <div className="leaderboard-item__value">
        <motion.div
          key={value_display ?? value}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
          }}
        >
          {value_display ?? value}
        </motion.div>
      </div>

      {progress_percent !== undefined && (
        <div className="leaderboard-item__progress">
          <ProgressBar percentage={progress_percent} />
        </div>
      )}

      {change !== undefined && (
        <div className="leaderboard-item__percentage-change">
          <ChangeIndicator change={change} changeUnits={change_display} />
        </div>
      )}
    </div>
  );
};
