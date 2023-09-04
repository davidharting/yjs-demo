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
      <h1 className="text-4xl">Live text editor</h1>
      <p className="text-base">
        It is automatically kept in sync with other users.
      </p>
      <Editor
        className="mt-8"
        language="markdown"
        height="80vh"
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
