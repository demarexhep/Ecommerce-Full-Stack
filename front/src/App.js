import React from "react";
import Header from "./components/header/Header";
import MainPages from "./components/mainpages/Pages";
import { DataProvider } from "./GobalState";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}
