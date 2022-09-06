import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Header } from "../../../components/Header/Header";
import { Button, SmallButton } from "../../../components/Button/Button";
import "../../../sass/TakeTest.scss";
import { Modal } from "../../../components/Modal/Modal";

export const TakeTestView = () => {
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

  useEffect(() => {
    const quizService = new BackendService("quizes");
    const userService = new BackendService("users");
    const activeQuizService = new BackendService("active-quizes");
    (async () => {
      try {
<<<<<<< HEAD
        const activeQuizez = await activeQuizService.getAllAsync();
        const activeQuizData = activeQuizez.find(
          (q) => q?.quiz?._id === testId && q?.user?._id === userId
        );
        if (activeQuizData) {
          setActiveQuiz(activeQuizData);
          setTest(activeQuizData.quiz);
          setQuestions(activeQuizData.quiz.questions);
          setCurrentQuestion(activeQuizData.quiz.questions[0]);
          setUser(activeQuizData.user);
        } else {
          const testData = await quizService.getByIdAsync(testId);
          const userData = await userService.getByIdAsync(userId);
          setUser(userData);
          const activeQuizData = await activeQuizService.postAsync({
            quiz: testData,
            user: userData,
          });
          console.log(activeQuizData);
          // setActiveQuiz(activeQuizData);
          setTest(testData);
          setQuestions(testData.questions);
          setCurrentQuestion(testData.questions[0]);
        }
=======
        const data = await quizService.getByIdAsync(testId);
        setTest(data);
        setQuestions(data.questions);
        setCurrentQuestion(questions[0]);
>>>>>>> 0e0a5ba866cdef583253c5c4cd7e129c3ef62713
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
<<<<<<< HEAD
    try {
      const activeQuizService = new BackendService("active-quizes");
      await activeQuizService.patchAsync(
        { user: user, quiz: { ...test, questions: questions } },
        activeQuiz._id
      );
    } catch (error) {
      console.error(error);
    }
=======

    //save changes to state
    setCurrentQuestion({
      ...currentQuestion,
      answers: currentQuestion.answers,
    });
>>>>>>> 0e0a5ba866cdef583253c5c4cd7e129c3ef62713

    setSelectedAnswer([
      ...selectedAnswers.filter((q) => q.question.id === currentQuestion.id),
      { question: currentQuestion, answer },
    ]);
  };

  const submitTest = async () => {
<<<<<<< HEAD
    try {
      const qgrade = calculateGrade();
      const userService = new BackendService("users");
      const user = await userService.getByIdAsync(userId);

      const reportsService = new BackendService("reports");
      await reportsService.postAsync({
        grade: qgrade,
        student: user,
        quizId: testId,
        date: Date.now(),
      });
      console.log("congratulations");

      const activeQuizService = new BackendService("active-quizes");
      await activeQuizService.deleteAsync(activeQuiz._id);

      setOpenModal(false);
      navigate("/finish-test");
    } catch (error) {
      console.error(error);
    }
=======
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
>>>>>>> 0e0a5ba866cdef583253c5c4cd7e129c3ef62713
  };

  const calculateGrade = () => {
    console.log(selectedAnswers);
    let grade = 0; 
    const scorePerQuestion = 100 / questions.length;
    selectedAnswers.forEach(q => {
      if(q.question.type === "singleChoice"){
      if(q.answer.isCorrect)
      {
        grade += scorePerQuestion; 
      }
    }
      else 
      {
        let scorePerAnswer = scorePerQuestion;
        let amountOfCorrectAnswers = 0; 
        q.question.answers.forEach(a => {
          if(a.isCorrect
            )
            amountOfCorrectAnswers += 1;
        })
        scorePerAnswer = scorePerAnswer/amountOfCorrectAnswers;
        let addToGrade = 0;
        
          if(q.answer.isCorrect)
          {
            addToGrade += scorePerAnswer;
          }
          else{
            addToGrade -= scorePerAnswer;
          }       
          
          if(addToGrade > 0)
          {
            grade += addToGrade; 
          }
    }
    })
    console.log(grade);
    return grade; 
  }

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
      <Modal
        display={openModal}
        confirm={submitTest}
        cancel={() => setOpenModal(false)}
        content={"Are you sure you want to submit the test?"}
        header={"Submit Test"}
        buttonContent={"Submit"}
      ></Modal>
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
<<<<<<< HEAD
          <SmallButton onClick={() => setOpenModal(true)}>
            submit test
          </SmallButton>
=======
>>>>>>> 0e0a5ba866cdef583253c5c4cd7e129c3ef62713
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
