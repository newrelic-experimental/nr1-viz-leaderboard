import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useNerdGraphQuery } from "../hooks/nerdGraph/useNerdGraphQuery";
import { useProps } from "../context/VizPropsProvider";
import { useSortableItems } from "../hooks/sort/useSortableItems";

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

  const { sortedItems, toggleSort, sort } = useSortableItems(items);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="leaderboard-item__position"></div>
        <div className="leaderboard-item__image">Image</div>
        <div
          className="leaderboard-item__name-units"
          onClick={() => toggleSort("name")}
        >
          Name & Units{" "}
          {sort.key === "name" && (sort.direction === "asc" ? "▲" : "▼")}
        </div>
        <div
          className="leaderboard-item__progress"
          onClick={() => toggleSort("currentValue")}
        >
          Progress{" "}
          {sort.key === "currentValue" &&
            (sort.direction === "asc" ? "▲" : "▼")}
        </div>
        <div
          className="leaderboard-item__percentage-change"
          onClick={() => toggleSort("previousValue")}
        >
          Change{" "}
          {sort.key === "previousValue" &&
            (sort.direction === "asc" ? "▲" : "▼")}
        </div>
      </div>
      <div className="leaderboard-rows">
        <AnimatePresence>
          {sortedItems.map((item: LeaderboardItemProps, index: number) => (
            <motion.div
              key={item.name}
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
