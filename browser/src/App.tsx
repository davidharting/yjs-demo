import { useSyncedStore } from "@syncedstore/react";
import { store } from "./store";

function App() {
  const state = useSyncedStore(store);

  const overwrite = (text: string) => {
    state.activeEditor.delete(0, state.activeEditor.length);
    state.activeEditor.insert(0, text);
  };

  return (
    <main>
      <h1>y-js demo</h1>

      <form>
        <div>
          <label htmlFor="textEditor">
            Add text here
            <textarea
              id="textEditor"
              rows={6}
              value={state.activeEditor.toString()}
              onChange={(e) => {
                if (typeof e.target.value === "string")
                  overwrite(e.target.value);
              }}
            />
            <small>It will be synced automatically</small>
          </label>
        </div>
      </form>
    </main>
  );
}

export default App;
