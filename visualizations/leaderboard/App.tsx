import React from "react";
import { AutoSizer } from "nr1";

import { useNerdGraphQuery } from "./hooks/nerdGraph/useNerdGraphQuery";
import { useProps } from "./context/VizPropsProvider";

import { EmptyState } from "./components/EmptyState";
import { Leaderboard } from "./components/Leaderboard";
import { LeaderboardSchema } from "./components/Leaderboard";
import { LeaderboardItemType } from "./components/LeaderboardItem";
import { useCompare } from "./hooks/compare/useCompare";
import { ErrorState } from "./components/ErrorState";

type QueryResponse = LeaderboardItemType;

export const App = ({ accountId }) => {
  if (!accountId) {
    return <EmptyState />;
  }

  const { query } = useProps();
  const { data, error, lastUpdateStamp } = useNerdGraphQuery<QueryResponse>(
    query,
    LeaderboardSchema,
  );

  if (error) {
    return <ErrorState errorMessage={error} />;
  }

  const compared = useCompare(data, "value");

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <div style={{ paddingRight: ".25rem", height: "100%" }}>
            <Leaderboard data={compared} />
          </div>
        );
      }}
    </AutoSizer>
  );
};
