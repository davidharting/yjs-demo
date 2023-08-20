function App() {
  return (
    <main>
      <h1>y-js demo</h1>

      <form>
        <div>
          <label htmlFor="textEditor">
            Add text here
            <textarea id="textEditor" rows={6} />
            <small>It will be synced automatically</small>
          </label>
        </div>
      </form>
    </main>
  );
}

export default App;
