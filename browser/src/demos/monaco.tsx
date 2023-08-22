import type { FC } from "react";
import { useSyncedStore } from "@syncedstore/react";
import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import y from "yjs";

import { store } from "../store";

export const MonacoDemo: FC = () => {
  const state = useSyncedStore(store);

  return (
    <div>
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
  );
};

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
