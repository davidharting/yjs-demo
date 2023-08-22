import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useSyncedStore } from "@syncedstore/react";
import type { editor } from "monaco-editor";
import y from "yjs";

import { store } from "./store";

const applyMonacoChangeToStore = (
  event: editor.IModelContentChangedEvent,
  doc: y.Text
): void => {
  event.changes.forEach((change) => {
    if (change.text === "") {
      doc.delete(change.rangeOffset, change.rangeLength);
    } else {
      doc.insert(change.rangeOffset, change.text);
    }
  });
};

function App() {
  const state = useSyncedStore(store);

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
      <div className="editor-container" style={{ flex: "48" }}>
        <h2>Edit this file</h2>
        <p>It is automatically kept in sync with other users.</p>
        <Editor
          language="markdown"
          height="75vh"
          value={state.activeEditor.toString()}
          onChange={(_value, event) => {
            applyMonacoChangeToStore(event, state.activeEditor);
          }}
        />
      </div>
    </main>
  );
}

export default App;
