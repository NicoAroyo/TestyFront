import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";

export const EditTest = () => {
  const { id, topic } = useParams();
  const [test, setTest] = useState({});
  const [originalTest, setOriginalTest] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const quizService = new BackendService("quizes");
    (async () => {
      const data = await quizService.getByIdAsync(id);
      setTest(data);
      setOriginalTest(data);
    })();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const quizService = new BackendService("quizes");
    try {
      await quizService.patchAsync(test, id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
     <button onClick={() => navigate(-1)}>Back</button>
      <div>
     
        <h2>edit test {test._id}</h2>
        <h3>topic: {topic}</h3>
        <form>
          <div>
            <label>language</label>
            <select
              value={test.language}
              onChange={(e) => setTest({ ...test, language: e.target.value })}
            >
              <option value={"eng"}>English</option>
              <option value={"heb"}>Hebrew</option>
            </select>
          </div>

          <div>
            <label>test name</label>
            <input
              onChange={(e) => setTest({ ...test, name: e.target.value })}
              value={test.name}
            ></input>
          </div>

          <div>
            <label>passing grade</label>
            <input
              onChange={(e) =>
                setTest({ ...test, passingGrade: +e.target.value })
              }
              type={"number"}
              value={test?.passingGrade}
            ></input>
          </div>

          <div>
            <label>show correct answers after submission</label>
            <input
              type={"checkbox"}
              checked={test?.showAnswers}
              onChange={(e) =>
                setTest({ ...test, showAnswers: e.target.checked })
              }
            ></input>
          </div>

          <div>
            <label>instructions</label>
            <textarea
              value={test?.instructions}
              onChange={(e) =>
                setTest({ ...test, instructions: e.target.value })
              }
            ></textarea>
          </div>

          <div>
            <label>on success</label>
            <textarea
              value={test?.passText}
              onChange={(e) => setTest({ ...test, passText: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label>on fail</label>
            <textarea
              value={test?.failText}
              onChange={(e) => setTest({ ...test, failText: e.target.value })}
            ></textarea>
          </div>

          <button onClick={(e) => submitForm(e)}>submit</button>
        </form>
      </div>
      {/* <button onClick={(e) => selectQuestions(e)}>Select questions</button>
      <div>
        {questions.map((question) => {
          return (
            <div key={question._id}>
              <input
                type={"checkbox"}
                onChange={(e) => selectQuestion(e.target.checked, question)}
              ></input>
              <span>{question.content}</span>
            </div>
          );
        })}
      </div> */}
      
    </>
  );
};
