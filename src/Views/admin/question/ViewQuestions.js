import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Button, SmallButton } from "../../../components/Button/Button";
import "../../../sass/ViewQuestions.scss";
import { Table } from "../../../components/Table/Table";
import { Modal } from "../../../components/Modal/Modal";

export const ManageQuestionsView = () => {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const questionService = new BackendService("questions");
    (async () => {
      try {
        const data = await questionService.getByTopicAsync(topic);
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [topic]);

  const deleteQuestion = async (e, id) => {
    e.stopPropagation();
    const questionService = new BackendService("questions");
    setQuestions(questions.filter((q) => q._id !== id));
    try {
      await questionService.deleteAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav>
        <h3>Topic: {topic}</h3>
        <div className="nav__button-container">
          <Button onClick={() => navigate("add")}>Add a question</Button>
          <Button onClick={() => navigate(-1)}>return</Button>
        </div>
      </nav>
      <main className="view__main">
        <h2 className="header">Questions List:</h2>
        <Table>
          <thead>
            <tr>
              <th>Content</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => {
              return (
                <Question
                  key={question._id}
                  question={question}
                  deleteQuestion={deleteQuestion}
                />
              );
            })}
          </tbody>
        </Table>
      </main>
    </>
  );
};

const Question = ({ question, deleteQuestion }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const openModal = (e) => {
    e.stopPropagation();
    setModalText(
      `Are you sure you want to delete question "${question.content}"`
    );
    setOpen(true);
  };

  const confirmDelete = (e) => {
    deleteQuestion(e, question._id);
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
      <tr key={question._id} onClick={() => setShowDetails(!showDetails)}>
        <td>{question.content}</td>
        <td>{question.type}</td>
        <td className="question__button-container">
          <SmallButton onClick={openModal}>delete</SmallButton>
          <SmallButton onClick={() => navigate(`edit/${question._id}`)}>
            edit
          </SmallButton>
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan={"100%"}>
            <div className="question__answers-container">
              <h4>answers:</h4>
              {question.answers.map((answer, ind) => {
                return (
                  <p key={ind}>
                    {ind + 1}. {answer.content}
                  </p>
                );
              })}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
