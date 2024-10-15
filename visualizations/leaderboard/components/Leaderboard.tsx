import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSortableItems } from "../hooks/sort/useSortableItems";

import { LeaderboardItem, LeaderboardItemProps } from "./LeaderboardItem";

export type LeaderboardProps = {
  data: LeaderboardItemProps[] | [];
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const { sortedItems, toggleSort, sort } = useSortableItems(data);

  if (!sortedItems.length) {
    return null;
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="leaderboard-item__position"></div>
        <div className="leaderboard-item__image">Image</div>
        <div
          className="leaderboard-item__name-units"
          onClick={() => toggleSort("name")}
        >
          {sortedItems[0].name_heading}{" "}
          {sort.key === "name" && (sort.direction === "asc" ? "▲" : "▼")}
        </div>
        <div
          className="leaderboard-item__value"
          onClick={() => toggleSort("value")}
        >
          {sortedItems[0].value_heading}{" "}
          {sort.key === "value" && (sort.direction === "asc" ? "▲" : "▼")}
        </div>
        <div
          className="leaderboard-item__progress"
          onClick={() => toggleSort("progress_percent")}
        >
          {sortedItems[0].progress_percent_heading}{" "}
          {sort.key === "progress_percent" &&
            (sort.direction === "asc" ? "▲" : "▼")}
        </div>
        {sortedItems[0].change && (
          <div
            className="leaderboard-item__percentage-change"
            onClick={() => toggleSort("change")}
          >
            {sortedItems[0].change_heading}{" "}
            {sort.key === "change" && (sort.direction === "asc" ? "▲" : "▼")}
          </div>
        )}
      </div>
      <div className="leaderboard-rows">
        <AnimatePresence>
          {sortedItems.map((item: LeaderboardItemProps, index: number) => (
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
