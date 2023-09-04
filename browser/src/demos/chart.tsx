import { useSyncedStore } from "@syncedstore/react";
import type { FC } from "react";
import { Chart } from "react-charts";

import { store } from "../store";

export const ChartDemo: FC = () => {
  const { chartData } = useSyncedStore(store);

  const data = chartData.map((d, i) => {
    return {
      x: i,
      y: d,
    };
  });
  return (
    <div>
      <h1 className="text-4xl">Chart based on live server data</h1>
      <div style={{ height: "650px" }}>
        <Chart
          options={{
            data: [{ label: "Series 1", data }],
            primaryAxis: { getValue: (d) => d.x },
            secondaryAxes: [{ getValue: (d) => d.y }],
          }}
        />
      </div>
    </div>
  );
};
