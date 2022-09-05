import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Header } from "../../../components/Header/Header";
import { Button, SmallButton } from "../../../components/Button/Button";
import "../../../sass/TakeTest.scss";

export const TakeTestView = () => {
  const { userId, testId } = useParams();
  const [test, setTest] = useState();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswer] = useState([]);
  const [start, setStart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const quizService = new BackendService("quizes");
    (async () => {
      try {
        const data = await quizService.getByIdAsync(testId);
        setTest(data);
        setQuestions(data.questions);
        setCurrentQuestion(questions[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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

    setSelectedAnswer([
      ...selectedAnswers.filter((q) => q.question.id === currentQuestion.id),
      { question: currentQuestion, answer },
    ]);
  };

  const submitTest = async () => {
    console.log(selectedAnswers);
    const qgrade = calculateGrade();
    const userService = new BackendService("users");
    const user = await userService.getByIdAsync(userId);
    console.log(qgrade);
    const report = {
      grade: qgrade,
      student: user,
      quizId: testId,
      date: Date.now(),
    };
    console.log(report);
    const service = new BackendService("reports");
    await service.postAsync(report);
    console.log("congratulations");
  };

  const calculateGrade = () => {
    console.log(selectedAnswers);
    let grade = 0;
    const scorePerQuestion = 100 / questions.length;
    selectedAnswers.forEach((q) => {
      if (q.answer.isCorrect) {
        grade += scorePerQuestion;
      }
    });
    console.log(grade);
    return grade;
  };

  //QUESTION NAVIGATION
  const nextQuestion = () => {
    const index = questions.indexOf(currentQuestion);
    if (index >= questions.length - 1) return;
    setCurrentQuestion(questions[index + 1]);
  };
  const previousQuestion = () => {
    const index = questions.indexOf(currentQuestion);
    if (index <= 0) return;
    setCurrentQuestion(questions[index - 1]);
  };

  if (!start) {
    return <Instructions setStart={setStart} test={test} />;
  }

  return (
    <main className="exam">
      <Header>test name: {test?.name}</Header>
      <div className="exam__question">
        <h2 className="question__content">{currentQuestion?.content}</h2>
        <div className="question__answers">
          {currentQuestion?.answers?.map((answer) => {
            return (
              <div
                className="question__single-answer"
                key={answer.id}
                style={{ display: "flex" }}
              >
                <input
                  checked={answer.checked}
                  name="answer"
                  type={
                    currentQuestion.type === "singleChoice"
                      ? "radio"
                      : "checkbox"
                  }
                  onChange={(e) => selectAnswer(e, answer)}
                ></input>
                <p>{answer.content}</p>
              </div>
            );
          })}
          <div className="button-container">
            <SmallButton onClick={previousQuestion}>Previous</SmallButton>
            <SmallButton onClick={nextQuestion}>Next</SmallButton>
          </div>
        </div>
      </div>

      <div>
        <footer className="questions-footer">
          <div className="navigate">
            <p>Navigate:</p>
            <div className="questions-nav">
              {questions.map((question, index) => {
                return (
                  <button
                    className={
                      currentQuestion == question ? "btn-active" : "btn-nav"
                    }
                    // className={currentQuestion == question && "btn-active"}
                    key={index}
                    onClick={() => setCurrentQuestion(questions[index])}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </footer>
      </div>

      {questions.every((q) => q.answers.some((a) => a.checked)) && (
        <>
          <SmallButton onClick={submitTest}>submit</SmallButton>
          <h2>You've finished all the questions, you may submit the test</h2>
        </>
      )}
    </main>
  );
};

const Instructions = ({ setStart, test }) => {
  return (
    <div className="test-instructions">
      <Header>test name: {test?.name}</Header>
      <Header>{test?.instructions}</Header>
      <p>Good Luck!</p>
      <SmallButton onClick={() => setStart(true)}>Begin</SmallButton>
    </div>
  );
};
