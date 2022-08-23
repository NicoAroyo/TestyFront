import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminView = () => {
  const [options, setOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("None");
  const navigate = useNavigate();

  return (
    <>
      <div>
        <form>
          <label>Choose a topic</label>
          <select
            defaultValue={"None"}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Development">Development</option>
            <option value="Coding">Coding</option>
            <option value="React">React</option>
            <option value="C#">C#</option>
            <option value="Cloud">Cloud</option>
          </select>
        </form>
        <div>
          <button disabled={selectedTopic === "None"}>manage questions </button>
          <button disabled={selectedTopic === "None"}>manage tests </button>
          <button disabled={selectedTopic === "None"}>reports</button>
        </div>
      </div>
    </>
  );
};
