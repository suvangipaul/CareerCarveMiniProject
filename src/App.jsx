import "./styles.css";
import React from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Row } from "./components/Row/Row";
import { data } from "./data"
import "./App.css"

export default function App() {
  const [rawData, setRawData] = useState(data)
  const temp = rawData.map(x => x.title)
  const [titles, setTitles] = useState(temp);
  const [activeTitle, setActiveTitle] = useState(null);

  return (
    <div className="app">
      <h2 className="title">Select your Sections</h2>
      <Reorder.Group axis="y" onReorder={setTitles} values={titles}>
        {titles.map((title, i) => (
          <Row 
            key={title} 
            i={i}
            title={title}
            setActiveTitle={setActiveTitle}
            activeTitle={activeTitle}
            rawData={rawData}
            setRawData={setRawData}
          />
          ))}
      </Reorder.Group>
    </div>
  );
}
