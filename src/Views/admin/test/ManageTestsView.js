import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";

export const ManageTestsView = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const { topic } = useParams();

  useEffect(() => {
    const service = new BackendService("quizes");
    (async () => {
      const data = await service.getAllAsync();
      console.log(data);
      // console.log(data);
      setTests(data.filter((q) => q.topic === topic));
      console.log(tests);
    })();
  }, []);

  return (
    <>
      <div>ManageTestsView</div>
      <button onClick={() => navigate("add")}>Add a new test x)</button>
      <button onClick={() => navigate(-1)}>go back lol</button>
      <h2>Quiz List:</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Test Name</th>
            <th>Num of questions</th>
            <th>Passing Grade</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => {
            return (
              <tr key={test.id}>
                <td>{test.id}</td>
                <td>{test.name}</td>
                <td>{test.questions.length}</td>
                <td>{test.passingGrade}</td>
                <td>
                  <div>
                    <button onClick={() => navigate(`edit/${test._id}`)}>
                      edit
                    </button>
                    <button>duplicate</button>
                    <p>active</p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
