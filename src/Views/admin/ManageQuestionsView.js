import React, { useEffect, useState } from "react";
import { questionsService } from "../../service/questionsService";
import { useNavigate } from "react-router-dom";
export const ManageQuestionsView = () => {

  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const service = new questionsService();
    (async () => {
      const data = await service.getAll();
      console.log(data);
      setQuestions(data);
    })();
  }, []);


  return (
    <>
      <div>ManageQuestionsView</div>
      <button onClick={() => navigate("add")}> add question</button>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
