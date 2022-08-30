import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Button } from "../../../components/Button/Button";

export const ManageQuestionsView = () => {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const questionService = new BackendService("questions");
    (async () => {
      try {
        const data = await questionService.getAllAsync();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const deleteQuestion = async (id) => {
    const questionService = new BackendService("questions");
    setQuestions(questions.filter((q) => q._id != id));
    try {
      await questionService.deleteAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Topic: {topic}</h3>
      <Button onClick={() => navigate("add")}>Add a question</Button>
      <Button onClick={() => navigate(-1)}>return</Button>
      <h2>Questions List:</h2>
      <table>
        <thead>
          <tr>
            <th>Content</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => {
            return (
              <Question question={question} deleteQuestion={deleteQuestion} />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const Question = ({ question, deleteQuestion }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <tr key={question._id} onClick={() => setShowDetails(!showDetails)}>
        <td>{question.content}</td>
        <td>{question.type}</td>
        <button onClick={() => deleteQuestion(question._id)}>delete</button>
        <button onClick={() => navigate(`edit/${question._id}`)}>edit</button>
      </tr>
      {showDetails && (
        <div>
          {question.answers.map((answer) => {
            return <p>{answer.content}</p>;
          })}
        </div>
      )}
    </>
  );
};
