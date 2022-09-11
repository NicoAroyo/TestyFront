import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Header } from "../../../components/Header/Header";
import { Button, SmallButton } from "../../../components/Button/Button";
import "../../../sass/TakeTest.scss";
import { Modal } from "../../../components/Modal/Modal";
import { shuffle } from "../../../utils/core";

export const TakeTest = () => {
  const { userId, testId } = useParams();
  const [test, setTest] = useState();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [selectedAnswers, setSelectedAnswer] = useState([]);
  const [start, setStart] = useState(false);
  const [user, setUser] = useState({});
  const [activeQuiz, setActiveQuiz] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const selectAnswer = async (e, answer) => {
    if (currentQuestion.type === "singleChoice") {
      //uncheck all others
      currentQuestion.answers.forEach((a) => (a.checked = false));
    }

    answer.checked = e.target.checked;
    try {
      const activeQuizService = new BackendService("active-quizes");
      await activeQuizService.patchAsync(
        { user: user, quiz: { ...test, questions: questions } },
        activeQuiz._id
      );
    } catch (error) {
      console.error(error);
    }

    setSelectedAnswer([
      ...selectedAnswers.filter((q) => q.question.id === currentQuestion.id),
      { question: currentQuestion, answer },
    ]);
  };

  const submitTest = async () => {
    try {
      const qgrade = calculateGrade();
      const userService = new BackendService("users");
      const userData = await userService.getByIdAsync(userId);

      const reportsService = new BackendService("reports");
      const rep = await reportsService.postAsync({
        grade: qgrade,
        student: userData,
        quizId: testId,
        date: Date.now(),
        questions: activeQuiz.questions,
      });
      console.log("congratulations");

      const activeQuizService = new BackendService("active-quizes");
      await activeQuizService.deleteAsync(activeQuiz._id);

      setOpenModal(false);
      // navigate("/finish-test");
      console.log("congratulations");
      navigate(`/finish-test/${rep._id}/${test._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateGrade = () => {
    console.log(selectedAnswers);
    let grade = 0;
    const scorePerQuestion = 100 / questions.length;
    selectedAnswers.forEach((q) => {
      if (q.question.type === "singleChoice") {
        if (q.answer.isCorrect) {
          grade += scorePerQuestion;
        }
      } else {
        let scorePerAnswer = scorePerQuestion;
        let amountOfCorrectAnswers = 0;
        q.question.answers.forEach((a) => {
          if (a.isCorrect) amountOfCorrectAnswers += 1;
        });
        scorePerAnswer = scorePerAnswer / amountOfCorrectAnswers;
        let addToGrade = 0;

        if (q.answer.isCorrect) {
          addToGrade += scorePerAnswer;
        } else {
          addToGrade -= scorePerAnswer;
        }

        if (addToGrade > 0) {
          grade += addToGrade;
        }
      }
    });
    console.log(grade);
    return grade;
  };

  useEffect(() => {
    (async () => {
      const quizService = new BackendService("quizes");
      const userService = new BackendService("users");
      const testData = await quizService.getByIdAsync(testId);
      const userData = await userService.getByIdAsync(userId);
      setTest(testData);
      setUser(userData);
    })();
  }, []);

  const beginTest = async () => {
    setStart(true);
    const activeQuizService = new BackendService("active-quizes");
    try {
      let activeQuizData;
      //search if quiz is active
      const activeQuizez = await activeQuizService.getAllAsync();
      activeQuizData = activeQuizez.find(
        (q) => q?.quiz?._id === testId && q?.user?._id === userId
      );
      //if not instantiate a new one
      if (!activeQuizData) {
        activeQuizData = await activeQuizService.postAsync({
          quiz: test,
          user: user,
        });
        //shuffle questions
        setQuestions(shuffle(activeQuizData.quiz.questions));
      } else {
        setQuestions(activeQuizData.quiz.questions);
      }
      //if active quiz found dont shuffle
      setActiveQuiz(activeQuizData);
      setTest(activeQuizData.quiz);
      setCurrentQuestion(activeQuizData.quiz.questions[0]);
      setUser(activeQuizData.user);
    } catch (error) {
      console.error(error);
    }
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
    return <Instructions beginTest={beginTest} test={test} />;
  }

  return (
    <main className="exam">
      <Modal
        display={openModal}
        confirm={submitTest}
        cancel={() => setOpenModal(false)}
        content={"Are you sure you want to submit the test?"}
        header={"Submit Test"}
        buttonContent={"Submit"}
      ></Modal>
      <Header> {test?.name}</Header>
      <div className="exam__question">
        <h4 className="question__content keep-linebreak">
          {currentQuestion?.content}
        </h4>
        <div className="question__answers">
          {currentQuestion?.answers?.map((answer) => {
            return (
              <div
                className="question__single-answer"
                key={answer.id}
                style={{ display: "flex" }}
              >
                <input
                  checked={answer.checked === true ? true : false}
                  name="answer"
                  type={
                    currentQuestion.type === "singleChoice"
                      ? "radio"
                      : "checkbox"
                  }
                  onChange={(e) => selectAnswer(e, answer)}
                ></input>
                <p className="keep-linebreak">{answer.content}</p>
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
          <SmallButton onClick={() => setOpenModal(true)}>
            submit test
          </SmallButton>
        </footer>
      </div>

      {/* {questions.every((q) => q.answers.some((a) => a.checked)) && (
        <>
          <SmallButton onClick={submitTest}>submit</SmallButton>
          <h2>You've finished all the questions, you may submit the test</h2>
        </>
      )} */}
    </main>
  );
};

export const Instructions = ({ test, beginTest }) => {
  return (
    <div className="test-instructions">
      <Header>{test?.name}</Header>
      <p className="instructions keep-linebreak">{test?.instructions}</p>
      <p>Good Luck!</p>
      <SmallButton onClick={() => beginTest()}>Begin</SmallButton>
    </div>
  );
};
