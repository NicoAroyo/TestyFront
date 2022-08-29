import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { BackendService } from "../../service/backendService";

export const AdminView = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("None");
  const navigate = useNavigate();

  useEffect(() => {
    const service = new BackendService("topics");
    (async () => {
      const data = await service.getAllAsync();
      setTopics(data);
    })();
  }, []);

  return (
    <>
      {/* <Button onClick={() => navigate(-1)}>Back</Button> */}
      <form>
        <h2>Choose a topic</h2>
        <select
          defaultValue={"None"}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option>None</option>;
          <Topics topics={topics} />
        </select>
      </form>

      <div>
        <Button
          onClick={() => navigate(`/${selectedTopic}/questions/`)}
          disabled={selectedTopic === "None"}
        >
          manage questions
        </Button>

        <Button
          onClick={() => navigate(`/${selectedTopic}/tests/`)}
          disabled={selectedTopic === "None"}
        >
          manage tests
        </Button>

        <Button
          onClick={() => navigate("reports")}
          disabled={selectedTopic === "None"}
        >
          reports
        </Button>
      </div>
    </>
  );
};

export const Topics = ({ topics }) => {
  return (
    <>
      {topics.map((topic) => {
        return (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        );
      })}
    </>
  );
};
