import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
export const TakeTestView = () => {
  const { id } = useParams();
  const [test, setTest] = useState();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const service = new BackendService("quizes");
    (async () => {
      const data = await service.getByIdAsync(id);
      setTest(data);
      setQuestions(data.questions);
    })();
  }, []);

  const navigateToQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    console.log("CURRENT QUESTION:", currentQuestion);
  };

  const selectAnswer = (e, answer) => {
    if (currentQuestion.type === "singleChoice") {
      //uncheck all others
      currentQuestion.answers.forEach((a) => (a.checked = false));
    }

    answer.checked = e.target.checked;

    //save changes to state
    setCurrentQuestion({
      ...currentQuestion,
      answers: currentQuestion.answers,
    });
  };

  const submitTest = () => {
    console.log("submitting test xd");
  };

  return (
    <>
      <h1>test name: {test?.name}</h1>
      <div>
        <p>{currentQuestion.content}</p>
        {currentQuestion?.answers?.map((answer) => {
          return (
            <div key={answer.id} style={{ display: "flex" }}>
              <input
                checked={answer.checked}
                name="answer"
                type={
                  currentQuestion.type === "singleChoice" ? "radio" : "checkbox"
                }
                onChange={(e) => selectAnswer(e, answer)}
              ></input>
              <p>{answer.content}</p>
            </div>
          );
        })}
      </div>
      <div>
        {questions.map((question, index) => {
          return (
            <button key={index} onClick={() => navigateToQuestion(index)}>
              {index + 1}
            </button>
          );
        })}
      </div>
      <div></div>
      <button onClick={() => navigate(-1)}>Back</button>
      {questions[questions.length - 1] === currentQuestion ? (
        <>
          <h2>now you can submit lol</h2>
          <button onClick={submitTest}>submit test</button>
        </>
      ) : (
        <h2>not last question</h2>
      )}
    </>
  );
};

export const Question = () => {
  return <div>Question</div>;
};
