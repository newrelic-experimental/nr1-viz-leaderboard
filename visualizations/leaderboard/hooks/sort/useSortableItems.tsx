import { useMemo, useCallback, useState } from "react";

import { LeaderboardItemType } from "../../components/LeaderboardItem";

export type Sort = {
  key: keyof LeaderboardItemType;
  direction: "asc" | "desc";
};

export const useSortableItems = (items: Array<LeaderboardItemType>) => {
  const [sort, setSort] = useState<Sort>({
    key: "unique_id",
    direction: "asc",
  });

  const sortedItems = useMemo(() => {
    const { key, direction } = sort;

    if (!key || !direction) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a[key] === undefined || b[key] === undefined) {
        return 0;
      }

      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }

      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [items, sort]);

  const toggleSort = useCallback((key: keyof LeaderboardItemType) => {
    setSort((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "desc" ? "asc" : "desc",
    }));
  }, []);

  return { sortedItems, toggleSort, sort };
};
