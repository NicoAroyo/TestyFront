import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
export const ManageQuestionsView = () => {
  const { topic } = useParams();
  console.log(topic);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const questionService = new BackendService("questions");
    (async () => {
      const data = await questionService.getAllAsync();
      console.log(data);
      setQuestions(data);
    })();
  }, []);

  const deleteQuestion = async (id) => {
    const questionService = new BackendService("questions");
    setQuestions(questions.filter((q) => q._id != id));
    try {
      const res = await questionService.deleteAsync(id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Manage Questions</h2>
      <h3>Topic: {topic}</h3>
      <button onClick={() => navigate("add")}> add question uwu</button>
      <button onClick={() => navigate(-1)}>go back lol</button>
      <h2>Questions List:</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => {
            return (
              <tr key={question._id}>
                <td>{question._id}</td>
                <td>{question.content}</td>
                <button onClick={() => deleteQuestion(question._id)}>
                  delete
                </button>
                <button onClick={() => navigate(`edit/${question._id}`)}>
                  edit
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
