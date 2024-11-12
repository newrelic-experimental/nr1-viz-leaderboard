import { LeaderboardType } from "../../components/Leaderboard";
import { LeaderboardItemType } from "../../components/LeaderboardItem";

export const useCompare = (
  data: LeaderboardType,
  column: keyof LeaderboardItemType,
): Array<LeaderboardItemType> => {
  const hasComparison = data.some((item) => item.comparison !== undefined);

  if (!hasComparison) {
    return data;
  }

  const currentItems = data.filter((item) => item.comparison === "current");
  const previousItems = data.filter((item) => item.comparison === "previous");

  const previousItemsMap = new Map(
    previousItems.map((item) => [item.unique_id, item]),
  );

  return currentItems.map((currentItem) => {
    const previousItem = previousItemsMap.get(currentItem.unique_id);

    let change: number = 100; // Default to 100% for new items with no previous value

    if (previousItem) {
      if (
        typeof currentItem[column] === "number" &&
        typeof previousItem[column] === "number"
      ) {
        change =
          ((currentItem[column] - previousItem[column]) /
            previousItem[column]) *
          100;
      }
    }

    return {
      ...currentItem,
      change,
    };
  });
};
