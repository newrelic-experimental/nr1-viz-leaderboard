import React from "react";
import { LeaderboardType } from "../../components/Leaderboard";
import { LeaderboardItemType } from "../../components/LeaderboardItem";

export const useCompare = (
  data: LeaderboardType,
  column: keyof LeaderboardItemType
): Array<LeaderboardItemType> => {
  const hasComparison = data.some((item) => item.comparison !== undefined);

  if (!hasComparison) {
    return data;
  }

  const currentItems = data.filter((item) => item.comparison === "current");
  const previousItems = data.filter((item) => item.comparison === "previous");

  const previousItemsMap = new Map(
    previousItems.map((item) => [item.unique_id, item])
  );

  return currentItems.map((currentItem) => {
    const previousItem = previousItemsMap.get(currentItem.unique_id);

    if (!previousItem) {
      return currentItem;
    }

    let change: number | undefined = undefined;

    if (
      typeof currentItem[column] === "number" &&
      typeof previousItem[column] === "number"
    ) {
      change = currentItem[column] - previousItem[column];
    }

    return {
      ...currentItem,
      change: change,
    };
  });
};
