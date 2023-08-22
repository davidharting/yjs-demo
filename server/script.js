const Y = require("yjs");
const { WebsocketProvider } = require("y-websocket");

async function main() {
  const DOC_NAME = "yjsDemoState";

  const doc = new Y.Doc();
  const wsProvider = new WebsocketProvider(
    "ws://localhost:12345",
    DOC_NAME,
    doc,
    { WebSocketPolyfill: require("ws") }
  );

  wsProvider.on("status", (event) => {
    console.log(event.status);
  });

  /**
   *
   * @returns {Promise<undefined>}
   */
  const addChartData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        doc.transact((t) => {
          const chartData = doc.getArray("chartData");
          if (chartData.length > 25) {
            chartData.delete(0);
          }
          chartData.insert(chartData.length - 1, [
            Math.floor(Math.random() * 100),
          ]);
        });
        resolve();
      }, 1000);
    });
  };

  while (true) {
    await addChartData();
  }
}

main();
