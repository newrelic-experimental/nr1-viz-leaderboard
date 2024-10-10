import React, { useState } from "react";
import { AutoSizer } from "nr1";

import { EmptyState } from "./components/EmptyState";
import { Leaderboard } from "./components/Leaderboard";
import { LeaderboardItemProps } from "./components/LeaderboardItem";

const initialData: LeaderboardItemProps[] = [
  {
    position: 1,
    imageUrl: "https://picsum.photos/id/1/200",
    name: "Item 1",
    units: 100,
    pricePerUnit: 10,
    target: 1000,
    currentValue: 800,
    previousValue: 700,
  },
  {
    position: 2,
    imageUrl: "https://picsum.photos/id/2/200",
    name: "Item 2",
    units: 50,
    pricePerUnit: 20,
    target: 800,
    currentValue: 600,
    previousValue: 500,
  },
  {
    position: 3,
    imageUrl: "https://picsum.photos/id/3/200",
    name: "Item 3",
    units: 200,
    pricePerUnit: 5,
    target: 1500,
    currentValue: 1200,
    previousValue: 1100,
  },
  {
    position: 4,
    imageUrl: "https://picsum.photos/id/5/200",
    name: "Item 5",
    units: 300,
    pricePerUnit: 2,
    target: 1000,
    currentValue: 400,
    previousValue: 400,
  },
  {
    position: 5,
    imageUrl: "https://picsum.photos/id/4/200",
    name: "Item 4",
    units: 150,
    pricePerUnit: 15,
    target: 2000,
    currentValue: 200,
    previousValue: 300,
  },
];

export const App = ({ accountId }) => {
  console.log("accountId", accountId);
  if (!accountId) {
    return <EmptyState />;
  }

  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardItemProps[]>(initialData);

  const shuffleData = () => {
    const shuffledData = [...leaderboardData].sort(() => Math.random() - 0.5);
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
