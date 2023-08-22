import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { IndexeddbPersistence } from "y-indexeddb";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { WebsocketProvider } from "y-websocket";

export const store = syncedStore({
  activeEditor: "text",
});

/**
 * Documents need a name when using integrations.
 * This way, the doc can be uniquely identified, in this case within IndexedDB and by the websocket server.
 */
const DOC_NAME = "yjsDemoState";

/**
 * SyncedStore is built directly on top of ydoc. ydoc integrations are not abstracted away from us.
 * We can use the ydoc instance directly to setup local persistence and websocket integration.
 */
const ydoc = getYjsDoc(store);

new IndexeddbPersistence(DOC_NAME, ydoc);
new WebsocketProvider("ws://localhost:12345", DOC_NAME, ydoc);
