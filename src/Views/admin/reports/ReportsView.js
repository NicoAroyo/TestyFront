import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BackendService } from "../../../service/backendService";
import { Table } from "../../../components/Table/Table";
import { Button, SmallButton } from "../../../components/Button/Button";
import { Header } from "../../../components/Header/Header";
import "../../../sass/ReportsView.scss";

export const ReportsView = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const { topic } = useParams();

  useEffect(() => {
    const service = new BackendService("quizes");
    (async () => {
      const data = await service.getByTopicAsync(topic);
      setTests(data);
    })();
  }, []);
  return (
    <main className="reports">
      <Header>Choose a test to see reports for</Header>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Test</th>
              <th>Go to test</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => {
              return (
                <>
                  <tr key={test.id}>
                    <td>{test.name}</td>
                    <td>
                      <SmallButton
                        onClick={() => navigate(`reports-for/${test._id}`)}
                      >
                        View reports
                      </SmallButton>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </main>
  );
};
