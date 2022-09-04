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
      <form className="select-topic">
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
      </form>

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
