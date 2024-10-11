import React, { useState } from "react";
import { AutoSizer } from "nr1";

import { useNerdGraphQuery } from "./hooks/nerdGraph/useNerdGraphQuery";
import { useProps } from "./context/VizPropsProvider";

import { EmptyState } from "./components/EmptyState";
import { Leaderboard } from "./components/Leaderboard";
import { LeaderboardItemProps } from "./components/LeaderboardItem";

type QueryResponse = LeaderboardItemProps;

const initialData: Array<QueryResponse> = [
  {
    unique_id: 123,
    image_url: "https://picsum.photos/id/1/200",
    name: "Item 1",
    name_heading: "Name",
    name_extra_data: "units @ £price_per_unit",
    value: 200,
    value_heading: "Value",
    value_display: "£",
    progress_percent: 80,
    progress_percent_heading: "Progress",
    change: 50,
    change_heading: "Change",
    change_display: "%",
  },
  {
    unique_id: 456,
    image_url: "https://picsum.photos/id/2/200",
    name: "Item 2",
    name_heading: "Name",
    name_extra_data: "units @ £price_per_unit",
    value: 100,
    value_heading: "Value",
    value_display: "£",
    progress_percent: 60,
    progress_percent_heading: "Progress",
    change: 100,
    change_heading: "Change",
    change_display: "%",
  },
  {
    unique_id: 789,
    image_url: "https://picsum.photos/id/3/200",
    name: "Item 3",
    name_heading: "Name",
    name_extra_data: "units @ £price_per_unit",
    value: 400,
    value_heading: "Value",
    value_display: "£",
    progress_percent: 20,
    progress_percent_heading: "Progress",
    change: 5,
    change_heading: "Change",
    change_display: "%",
  },
  {
    unique_id: 101112,
    image_url: "https://picsum.photos/id/5/200",
    name: "Item 5",
    name_heading: "Name",
    name_extra_data: "units @ £price_per_unit",
    value: 700,
    value_heading: "Value",
    value_display: "£",
    progress_percent: 78,
    progress_percent_heading: "Progress",
    change: 90,
    change_heading: "Change",
    change_display: "%",
  },
  {
    unique_id: 131415,
    image_url: "https://picsum.photos/id/4/200",
    name: "Item 4",
    name_heading: "Name",
    name_extra_data: "units @ £price_per_unit",
    value: 30,
    value_heading: "Value",
    value_display: "£",
    progress_percent: 14,
    progress_percent_heading: "Progress",
    change: 3,
    change_heading: "Change",
    change_display: "%",
  },
];

export const App = ({ accountId }) => {
  if (!accountId) {
    return <EmptyState />;
  }

  const { query } = useProps();
  const { data, error, lastUpdateStamp } =
    useNerdGraphQuery<QueryResponse>(query);

  console.log("data", data[0]);

  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardItemProps[]>(initialData);

  const shuffleData = () => {
    const shuffledData = [...leaderboardData].map((item, index) => ({
      ...item,
      position: index,
      value: Math.floor(Math.random() * 1000),
      progress_percent: Math.floor(Math.random() * 100),
      change: Math.floor(Math.random() * 100),
    }));
    setLeaderboardData(shuffledData);
  };

  return (
    <AutoSizer>
      {({ width, height }) => {
        return (
          <div style={{ paddingRight: ".25rem", height: "100%" }}>
            <ShuffleButton onClick={shuffleData} />
            <Leaderboard data={leaderboardData} />
          </div>
        );
      }}
    </AutoSizer>
  );
};

const ShuffleButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className="shuffle-button" onClick={onClick}>
      Shuffle Leaderboard
    </button>
  );
};
