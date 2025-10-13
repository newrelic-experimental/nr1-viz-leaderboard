import React, { useRef } from "react";
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

type LeaderboardItemProps = z.infer<typeof LeaderboardProps> & {
  renderStartTime: number;
};

export const Leaderboard: React.FC<LeaderboardItemProps> = ({ data, renderStartTime }) => {
  const { sortedItems, toggleSort, sort } = useSortableItems(data);
  const hasLoggedInitialRender = useRef(false);

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
    additional_column_1,
    additional_column_1_heading,
    additional_column_2,
    additional_column_2_heading,
  } = sortedItems[0];

  // Log render completion time only on initial render
  if (!hasLoggedInitialRender.current) {
    console.log(`⏱️ [Performance] Table rendered in ${performance.now() - renderStartTime}ms`);
    hasLoggedInitialRender.current = true;
  }

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
        {additional_column_1 !== undefined && (
          <div
            className="leaderboard-item__additional-column-1 header"
            onClick={() => toggleSort("additional_column_1")}
          >
            {additional_column_1_heading}{" "}
            {sort.key === "additional_column_1" && (sort.direction === "asc" ? "▲" : "▼")}
          </div>
        )}
        {additional_column_2 !== undefined && (
          <div
            className="leaderboard-item__additional-column-2 header"
            onClick={() => toggleSort("additional_column_2")}
          >
            {additional_column_2_heading}{" "}
            {sort.key === "additional_column_2" && (sort.direction === "asc" ? "▲" : "▼")}
          </div>
        )}
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
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <LeaderboardItem item={{ ...item, position: index + 1 }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
