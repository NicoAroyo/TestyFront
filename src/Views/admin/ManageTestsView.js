import React, { useEffect, useState } from "react";
import { quizService } from "../../service/quizService";

export const ManageTestsView = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const service = new quizService();
    (async () => {
      const data = await service.getAll();
      console.log(data);
      setTests(data);
    })();
  }, []);

  return (
    <>
      <div>ManageTestsView</div>
      <button>Add a new test x)</button>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
