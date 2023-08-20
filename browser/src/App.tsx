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
  // TODO: Handle Undo
  // TODO: Handle Redo
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

      <div className="editor-container">
        <Editor
          language="markdown"
          height="50vh"
          value={state.activeEditor.toString()}
          onChange={(_value, event) => {
            applyMonacoChangeToStore(event, state.activeEditor);
          }}
        />
      </div>

      <div style={{ height: "50vh" }}>
        <ReactMarkdown>{state.activeEditor.toString()}</ReactMarkdown>
      </div>
    </main>
  );
}

export default App;
