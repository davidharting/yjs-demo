import { useState } from "react";
import { MonacoDemo } from "./demos/monaco";
import { ChartDemo } from "./demos/chart";

function App() {
  const [demo, setDemo] = useState<"monaco" | "chart">("monaco");

  return (
    <main>
      <h1>y-js demo</h1>

      <form>
        <fieldset>
          <legend>Select a demo</legend>
          <select
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
        </fieldset>
      </form>

      <div>
        {demo === "monaco" && <MonacoDemo />}
        {demo === "chart" && <ChartDemo />}
      </div>
    </main>
  );
}

export default App;
