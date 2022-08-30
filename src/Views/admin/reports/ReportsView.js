import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BackendService } from "../../../service/backendService";

export const ReportsView = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const topic = useParams(); 

  useEffect(() => {
    const service = new BackendService("quizes");
    console.log(topic);
    (async () => {
      const data = await service.getAllAsync();
      console.log(data);
      // console.log(data);
      setTests(data.filter((q) => q.topic === topic.topic));
      console.log(tests);
    })();
  }, []);
  return (
    <>
      <div>Choose a test to see reports for</div>
      <div>
        <table>
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
                      <button
                        onClick={() => navigate(`/reports-for/${test.id}`)}
                      >
                        View reports
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </>
  );
};
