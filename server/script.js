const Y = require("yjs");
const { WebsocketProvider } = require("y-websocket");

async function main() {
  const DOC_NAME = "yjsDemoState";

  const serverUrl =
    process.env.NODE_ENV === "production"
      ? "wss://yjs-demo.fly.dev"
      : "ws://localhost:12345";
  const doc = new Y.Doc();
  const wsProvider = new WebsocketProvider(serverUrl, DOC_NAME, doc, {
    WebSocketPolyfill: require("ws"),
  });

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
          if (chartData.length === 0) {
            chartData.insert(0, [Math.floor(Math.random() * 100)]);
          } else {
            const latest = chartData.get(chartData.length - 1);
            const sign = Math.random() > 0.5 ? 1 : -1;
            const delta = Math.floor(Math.random() * 10);
            chartData.insert(chartData.length - 1, [latest + sign * delta]);
          }
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
