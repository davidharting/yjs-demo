import Editor from "@monaco-editor/react";
import { useSyncedStore } from "@syncedstore/react";
import type { editor } from "monaco-editor";
import ReactMarkdown from "react-markdown";
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

  return (
    <main>
      <h1>y-js demo</h1>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="editor-container" style={{ flex: "48" }}>
          <h2>Edit File</h2>
          <Editor
            language="markdown"
            height="75vh"
            value={state.activeEditor.toString()}
            onChange={(_value, event) => {
              applyMonacoChangeToStore(event, state.activeEditor);
            }}
          />
        </div>

        <div style={{ flex: "4" }} />

        <div style={{ height: "75vh", flex: "48" }}>
          <h2>Preview</h2>
          <ReactMarkdown>{state.activeEditor.toString()}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}

export default App;
