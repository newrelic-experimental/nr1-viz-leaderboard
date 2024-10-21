import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

import { useSortableItems } from "../hooks/sort/useSortableItems";

import {
  LeaderboardItem,
  LeaderboardItemType,
  LeaderboardItemSchema,
} from "./LeaderboardItem";

export const LeaderboardSchema = z.array(LeaderboardItemSchema);

export type LeaderboardType = z.infer<typeof LeaderboardSchema>;

const LeaderboardProps = z.object({
  data: LeaderboardSchema,
});

type LeaderboardItemProps = z.infer<typeof LeaderboardProps>;

export const Leaderboard: React.FC<LeaderboardItemProps> = ({ data }) => {
  const { sortedItems, toggleSort, sort } = useSortableItems(data);

  if (!sortedItems.length) {
    return null;
  }

  const {
    image_url,
    name_heading,
    value_heading,
    progress_percent,
    progress_percent_heading,
    change,
    change_heading,
  } = sortedItems[0];

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="leaderboard-item__position"></div>
        {image_url !== undefined && (
          <div className="leaderboard-item__image header">Image</div>
        )}
        <div
          className="leaderboard-item__name-units header"
          onClick={() => toggleSort("name")}
        >
          {name_heading}{" "}
          {sort.key === "name" && (sort.direction === "asc" ? "▲" : "▼")}
        </div>
        <div
          className="leaderboard-item__value header"
          onClick={() => toggleSort("value")}
        >
          {value_heading}{" "}
          {sort.key === "value" && (sort.direction === "asc" ? "▲" : "▼")}
        </div>
        {progress_percent !== undefined && (
          <div
            className="leaderboard-item__progress header"
            onClick={() => toggleSort("progress_percent")}
          >
            {progress_percent_heading}{" "}
            {sort.key === "progress_percent" &&
              (sort.direction === "asc" ? "▲" : "▼")}
          </div>
        )}
        {change !== undefined && (
          <div
            className="leaderboard-item__percentage-change header"
            onClick={() => toggleSort("change")}
          >
            {change_heading}{" "}
            {sort.key === "change" && (sort.direction === "asc" ? "▲" : "▼")}
          </div>
        )}
      </div>
      <div className="leaderboard-rows">
        <AnimatePresence>
          {sortedItems.map((item: LeaderboardItemType, index: number) => (
            <motion.div
              key={item.unique_id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1.5 }}
            >
              <LeaderboardItem item={{ ...item, position: index + 1 }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
