import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BackendService } from "../../../service/backendService";

export const ReportsView = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const service = new BackendService("quizes");
    (async () => {
      const data = await service.getAllAsync();
      console.log(data);
      setTests(data);
    })();
  }, []);
  return (
    <>
      <div>Choose a test to see reports for</div>
      <div>
        <table>
          <thead>
            <th>Test</th>
            <th>Go to test</th>
          </thead>
          <tbody>
            {tests.map((test) => {
              return (
                <>
                  <tr key={test.id}>
                    <td>{test.name}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/reports-for/${test._id}`)}
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