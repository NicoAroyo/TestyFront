import React, { useEffect, useState } from "react";
import { QuestionsService } from "../../service/questionsService";
import { useNavigate } from "react-router-dom";
export const ManageQuestionsView = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const service = new QuestionsService();
    (async () => {
      const data = await service.getAll();
      console.log(data);
      setQuestions(data);
    })();
  }, []);

  const deleteQuestion = async (id) => {
    const questionService = new QuestionsService();
    setQuestions(questions.filter((q) => q.id != id));
    await questionService.deleteAsync(id);
  };

  return (
    <>
      <div>ManageQuestionsView</div>
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
              <tr key={question.id}>
                <td>{question.id}</td>
                <td>{question.content}</td>
                <button onClick={() => deleteQuestion(question.id)}>
                  delete
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </>
  );
};
