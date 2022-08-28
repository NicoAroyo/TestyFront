import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BackendService } from "../../../service/backendService";

export const ChooseTestView = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const service = new BackendService("quizes");

  useEffect(() => {
    const service = new BackendService("quizes");
    (async () => {
      const data = await service.getAll();
      console.log(data);
      setTests(data);
    })();
  }, []);
  return (
    <>
      <div>ChooseTestView</div>
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
                      <button onClick={() => navigate(`/take-test/${test.id}`)}>
                        Take test
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
