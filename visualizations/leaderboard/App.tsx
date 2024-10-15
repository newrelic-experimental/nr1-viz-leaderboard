import React from "react";
import { AutoSizer } from "nr1";

import { useNerdGraphQuery } from "./hooks/nerdGraph/useNerdGraphQuery";
import { useProps } from "./context/VizPropsProvider";

import { EmptyState } from "./components/EmptyState";
import { Leaderboard } from "./components/Leaderboard";
import { LeaderboardItemProps } from "./components/LeaderboardItem";

type QueryResponse = LeaderboardItemProps;

export const App = ({ accountId }) => {
  if (!accountId) {
    return <EmptyState />;
  }

  const { query } = useProps();
  const { data, error, lastUpdateStamp } =
    useNerdGraphQuery<QueryResponse>(query);

  // if you compare different perionds in NR Query, we need to filter out the data
  const newData = data.filter((item) =>
    item.comparison ? item.comparison === "current" : true
  );

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <div style={{ paddingRight: ".25rem", height: "100%" }}>
            <Leaderboard data={newData} />
          </div>
        );
      }}
    </AutoSizer>
  );
};
