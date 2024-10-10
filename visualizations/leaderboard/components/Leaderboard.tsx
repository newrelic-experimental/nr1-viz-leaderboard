import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <AnimatePresence>
          {items.map((item: LeaderboardItemProps, index: number) => (
            <motion.div
              key={item.name}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <LeaderboardItem item={{ ...item, position: index + 1 }} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
