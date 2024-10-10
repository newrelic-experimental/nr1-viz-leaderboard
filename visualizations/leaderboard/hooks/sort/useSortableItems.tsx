import { useMemo, useCallback, useState } from "react";

import { LeaderboardItemProps } from "../../components/LeaderboardItem";

export type Sort = {
  key: keyof LeaderboardItemProps;
  direction: "asc" | "desc";
};

export const useSortableItems = (items: Array<LeaderboardItemProps>) => {
  const [sort, setSort] = useState<Sort>({
    key: "currentValue",
    direction: "desc",
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

  const toggleSort = useCallback((key: keyof LeaderboardItemProps) => {
    setSort((prevSort) => ({
      key,
      direction:
        prevSort.key === key && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  return { sortedItems, toggleSort, sort };
};
