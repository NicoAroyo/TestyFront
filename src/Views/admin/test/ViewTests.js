import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Button, SmallButton } from "../../../components/Button/Button";
// import "../../../sass/ViewTests.scss";
import { Table } from "../../../components/Table/Table";

export const ViewTests = () => {
  const { topic } = useParams();
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

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
      <nav>
        <h3>Manage Tests</h3>
        <div className="nav__button-container">
          <Button onClick={() => navigate("add")}>Add a new test</Button>
          <Button onClick={() => navigate(-1)}>return</Button>
        </div>
      </nav>

      <main className="view__main">
        <h2 className="header">Quiz List:</h2>
        <Table>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Num of questions</th>
              <th>Passing Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => {
              return (
                <Test navigate={navigate} test={test} deleteTest={deleteTest} />
              );
            })}
          </tbody>
        </Table>
      </main>
    </>
  );
};

const Test = ({ test, navigate, deleteTest }) => {
  return (
    <tr key={test._id}>
      <td>{test.name}</td>
      <td>{test.questions.length}</td>
      <td>{test.passingGrade}</td>
      <td>
        <td className="question__button-container">
          <SmallButton onClick={() => navigate(`edit/${test._id}`)}>
            edit
          </SmallButton>
          <SmallButton onClick={() => navigate(`details/${test._id}`)}>
            details
          </SmallButton>
          <SmallButton onClick={() => deleteTest(test._id)}>delete</SmallButton>
        </td>
      </td>
    </tr>
  );
};
