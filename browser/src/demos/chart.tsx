import { useSyncedStore } from "@syncedstore/react";
import CountUp from "react-countup";
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

  const penultimate = chartData.at(1) ?? 0;
  const latest = chartData.at(0) ?? 0;
  return (
    <div className="space-y-4">
      <h1 className="text-4xl">Chart based on live server data</h1>

      <div className="space-y-2">
        <div className="text-2xl text-primary flex items-center space-x-2">
          <CountUp start={penultimate} end={latest} duration={0.5} />
          <progress
            className="progress progress-primary w-2/3"
            value={latest}
            max="100"
          >
            {latest}%
          </progress>
        </div>

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
    </div>
  );
};
