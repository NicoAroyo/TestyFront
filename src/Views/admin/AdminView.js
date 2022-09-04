import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { BackendService } from "../../service/backendService";
import { ReportsView } from "./reports/ReportsView";
import "../../sass/AdminView.scss";

export const AdminView = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("None");
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const topicsService = new BackendService("topics");
    const userService = new BackendService("users");
    (async () => {
      const topicsData = await topicsService.getAllAsync();
      setTopics(topicsData);
      const userData = await userService.getByIdAsync(id);
      setUser(userData);
    })();
  }, []);

  return (
    <>
      <AdminNav
        navigate={navigate}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        topics={topics}
      />
      <AdminWelcome user={user} />
    </>
  );
};

const AdminWelcome = ({ user }) => {
  return (
    <div className="welcome">
      <h1>Welcome back {user.firstName}</h1>
    </div>
  );
};

const AdminNav = ({ selectedTopic, setSelectedTopic, topics, navigate }) => {
  return (
    <div className="menu">
      {/* <Button onClick={() => navigate(-1)}>Back</Button> */}
      <div className="select-topic">
        <label>topic</label>
        <select
          sx={{ width: 300 }}
          label="topic"
          defaultValue={"None"}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option>None</option>;
          {topics.map((topic) => {
            return (
              <option key={topic._id} value={topic.id}>
                {topic.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="container">
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
          onClick={() => navigate(`/${selectedTopic}/reports/`)}
          disabled={selectedTopic === "None"}
        >
          reports
        </Button>
      </div>
    </div>
  );
};
