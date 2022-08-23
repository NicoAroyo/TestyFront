import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicsService } from "../../service/topicsService";

export const AdminView = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("None");
  const navigate = useNavigate();

  useEffect(() => {
    const service = new TopicsService();
    (async () => {
      const data = await service.getAll();
      setTopics(data);
    })();
  }, []);

  return (
    <>
      <div>
        <form>
          <label>Choose a topic</label>
          <select
            defaultValue={"None"}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option>None</option>;
            {topics.map((topic) => {
              return (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              );
            })}
          </select>
        </form>
        <div>
          <button
            onClick={() => navigate("manage-questions")}
            disabled={selectedTopic === "None"}
          >
            manage questions{" "}
          </button>
          <button
            onClick={() => navigate(`manage-tests/${selectedTopic}`)}
            disabled={selectedTopic === "None"}
          >
            manage tests{" "}
          </button>
          <button
            onClick={() => navigate("reports")}
            disabled={selectedTopic === "None"}
          >
            reports
          </button>
        </div>
      </div>
    </>
  );
};
