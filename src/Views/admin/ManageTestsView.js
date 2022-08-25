import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizService } from "../../service/quizService";

export const ManageTestsView = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const { topicId } = useParams();

  useEffect(() => {
    const service = new QuizService();
    (async () => {
      const data = await service.getAll();
      setTests(data.filter((q) => q.topicId === +topicId));
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
                    <button>edit</button>
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
