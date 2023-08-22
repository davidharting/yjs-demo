import { useSyncedStore } from "@syncedstore/react";
import type { FC } from "react";

import { store } from "../store";

export const ChartDemo: FC = () => {
  const { chartData } = useSyncedStore(store);
  return (
    <div>
      <h2>Chart based on live server data</h2>
      {chartData.map((d) => (
        <div>{d}</div>
      ))}
    </div>
  );
};
