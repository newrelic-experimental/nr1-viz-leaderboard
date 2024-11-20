import React from "react";
import { AutoSizer } from "nr1";

import EmptyState from "./components/EmptyState";
import Thermometer from "./components/Thermometer";

const Viz = ({ accountId }) => {
  // return empty state if no config
  if (!accountId) {
    return <EmptyState />;
  }

  return (
    <AutoSizer className="autoSizer">
      {({ width, height }) => {
        return <Thermometer width={width} height={height} />;
      }}
    </AutoSizer>
  );
};

export default Viz;
