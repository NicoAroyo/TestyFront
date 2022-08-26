import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizService } from "../../service/quizService";
import { TopicsService } from "../../service/topicsService";

export const AddTest = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [newTest, setNewTest] = useState({
    topicId: +topicId,
    language: "eng",
  });

  useEffect(() => {
    const topicService = new TopicsService();
    //IIFE - immediately invoked function expression
    (async () => {
      const topic = await topicService.getByIdAsync(+topicId);
      setTopic(topic.name);
    })();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const quizService = new QuizService();

    newTest.questions = [1, 2];

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
                setNewTest({ ...newTest, passingGrade: e.target.value })
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
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </>
  );
};
