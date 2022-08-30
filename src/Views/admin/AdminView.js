import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { BackendService } from "../../service/backendService";
import "../../sass/AdminView.scss";

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
      <div className="menu">
        {/* <Button onClick={() => navigate(-1)}>Back</Button> */}
        <form className="select-topic">
          <label>topic</label>
          <select
            sx={{ width: 300 }}
            label="topic"
            defaultValue={"None"}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option>None</option>;
            {(topics || []).map((topic) => {
              return (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              );
            })}
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
      </div>
    </>
  );
};
