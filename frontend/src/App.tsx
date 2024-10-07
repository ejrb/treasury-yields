import React from "react";

import "./App.css";
import { useFetchYields } from "./hooks/useFetchYields";
import YieldChart, { flattenYields } from "./components/YieldChart";

function App() {
  const { data, loading } = useFetchYields();

  if (loading || !data) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <YieldChart data={flattenYields(data)} />
      </header>
    </div>
  );
}

export default App;
