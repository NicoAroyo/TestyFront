import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Button, SmallButton } from "../../../components/Button/Button";
import "../../../sass/ViewQuestions.scss";
import { Table } from "../../../components/Table/Table";
import { Modal } from "../../../components/Modal/Modal";

export const ViewTests = () => {
  const { topic } = useParams();
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const service = new BackendService("quizes");
    (async () => {
      const data = await service.getByTopicAsync(topic);
      setTests(data);
    })();
  }, []);

  const deleteTest = async (id) => {
    const service = new BackendService("quizes");
    try {
      setTests(tests.filter((x) => x._id !== id));
      await service.deleteAsync(id);
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
              <th>Code</th>
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
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const openModal = () => {
    setModalText(`Are you sure you want to delete quiz "${test.name}"`);
    setOpen(true);
  };

  const confirmDelete = () => {
    deleteTest(test._id);
    setOpen(false);
  };

  return (
    <>
      <Modal
        header={`Confirm Delete`}
        display={open}
        confirm={(e) => confirmDelete(e)}
        cancel={() => setOpen(false)}
        buttonContent={"Confirm"}
        content={modalText}
      ></Modal>
      <tr key={test._id}>
        <td>{test._id}</td>
        <td>{test.name}</td>
        <td>{test.questions.length}</td>
        <td>{test.passingGrade}</td>
        <td className="question__button-container">
          <SmallButton onClick={() => navigate(`edit/${test._id}`)}>
            edit
          </SmallButton>
          <SmallButton onClick={() => navigate(`details/${test._id}`)}>
            details
          </SmallButton>
          {/* <SmallButton onClick={() => deleteTest(test._id)}>delete</SmallButton> */}
          <SmallButton onClick={openModal}>delete</SmallButton>
        </td>
      </tr>
    </>
  );
};
