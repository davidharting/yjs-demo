import { useState } from "react";
import { MonacoDemo } from "./demos/monaco";
import { ChartDemo } from "./demos/chart";
import "./index.css";

function App() {
  const [demo, setDemo] = useState<"monaco" | "chart">("monaco");

  return (
    <div className="">
      <div className="navbar bg-primary text-secondary px-8">
        <div className="flex flex-row justify-between items-center w-full">
          <p className="normal-case text-3xl">yjs demo</p>
          <form className="flex items-end space-x-2">
            <label className="label">Choose Demo</label>
            <select
              className="select select-bordered select-secondary select-sm"
              value={demo}
              onChange={(e) => {
                const { value } = e.target;
                console.log(value);
                if (value === "monaco" || value === "chart") {
                  setDemo(value);
                }
              }}
            >
              <option value="monaco">Monaco</option>
              <option value="chart">Chart</option>
            </select>
          </form>
        </div>
      </div>
      <main className="mt-4 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        {demo === "monaco" && <MonacoDemo />}
        {demo === "chart" && <ChartDemo />}
      </main>
    </div>
  );
}

export default App;
