import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";

export const ViewTests = () => {
  const { topic } = useParams();
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const service = new BackendService("quizes");
    (async () => {
      const data = await service.getAllAsync();
      console.log(data);
      setTests(data.filter((q) => q.topic === topic));
      console.log(tests);
    })();
  }, []);

  const deleteTest = async (id) => {
    const service = new BackendService("quizes");
    try {
      setTests(tests.filter((x) => x._id !== id));
      const res = await service.deleteAsync(id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>ManageTestsView</div>
      <button onClick={() => navigate("add")}>Add a new test x)</button>
      <button onClick={() => navigate(-1)}>go back lol</button>
      <h2>Quiz List:</h2>
      <table>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Num of questions</th>
            <th>Passing Grade</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => {
            return (
              <tr key={test._id}>
                <td>{test.name}</td>
                <td>{test.questions.length}</td>
                <td>{test.passingGrade}</td>
                <td>
                  <div>
                    <button onClick={() => navigate(`edit/${test._id}`)}>
                      edit
                    </button>
                    <button onClick={() => navigate(`details/${test._id}`)}>
                      details
                    </button>
                    <button onClick={() => deleteTest(test._id)}>delete</button>
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
