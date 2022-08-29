import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackendService } from "../../../service/backendService";

export const AddTest = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [newTest, setNewTest] = useState({
    topic: topic,
    language: "eng",
  });

  useEffect(() => {
    // const topicService = new BackendService("topics");
    //IIFE - immediately invoked function expression
    // (async () => {
    //   const topic = await topicService.getByIdAsync(+topicName);
    //   setTopic(topic.name);
    // })();
  }, []);

  const selectQuestions = async (e) => {
    e.preventDefault();
    const questionService = new BackendService("questions");
    const data = await questionService.getAllAsync();
    console.log(data);
    setQuestions(data);
  };

  const selectQuestion = async (checked, question) => {
    if (checked) {
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q._id !== question._id)
      );
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const quizService = new BackendService("quizes");

    newTest.questions = selectedQuestions;
    console.log(newTest);
    try {
      await quizService.postAsync(newTest);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2>add new test</h2>
        <h3>topic: {topic}</h3>
        <form>
          <div>
            <label>language</label>
            <select
              defaultValue={"eng"}
              onChange={(e) =>
                setNewTest({ ...newTest, language: e.target.value })
              }
            >
              <option value={"eng"}>English</option>
              <option value={"heb"}>Hebrew</option>
            </select>
          </div>

          <div>
            <label>test name</label>
            <input
              onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
              value={newTest?.name ?? ""}
            ></input>
          </div>

          <div>
            <label>passing grade</label>
            <input
              onChange={(e) =>
                setNewTest({ ...newTest, passingGrade: +e.target.value })
              }
              type={"number"}
              value={newTest?.passingGrade ?? ""}
            ></input>
          </div>

          <div>
            <label>show correct answers after submission</label>
            <input
              type={"checkbox"}
              onChange={(e) =>
                setNewTest({ ...newTest, showAnswers: e.target.checked })
              }
            ></input>
          </div>

          <div>
            <label>instructions</label>
            <textarea
              value={newTest?.instructions ?? ""}
              onChange={(e) =>
                setNewTest({ ...newTest, instructions: e.target.value })
              }
            ></textarea>
          </div>

          <div>
            <label>on success</label>
            <textarea
              value={newTest?.passText ?? ""}
              onChange={(e) =>
                setNewTest({ ...newTest, passText: e.target.value })
              }
            ></textarea>
          </div>

          <div>
            <label>on fail</label>
            <textarea
              value={newTest?.failText ?? ""}
              onChange={(e) =>
                setNewTest({ ...newTest, failText: e.target.value })
              }
            ></textarea>
          </div>

          <button onClick={(e) => submitForm(e)}>submit</button>
        </form>
      </div>
      <button onClick={(e) => selectQuestions(e)}>Select questions</button>
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
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
};
