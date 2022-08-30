import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { AnswerForm } from "./AnswerForm";

export const AddQuestionView = () => {
  const { topic } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([
    { id: 1, content: "", isCorrect: false },
  ]);

  const deleteAnswer = (e, answerId) => {
    e.preventDefault();
    if (answers.length <= 1) return;
    setAnswers(answers.filter((a) => a.id !== answerId));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const questionService = new BackendService("questions");
    console.log(answers);
    question.answers = [...answers];
    question.topic = topic;
    try {
      await questionService.postAsync(question);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>topic: {topic}</h3>
      <form>
        <div>
          <label>question content:</label>
          <input
            type="text"
            value={question?.content ?? ""}
            onChange={(e) =>
              setQuestion({ ...question, content: e.target.value })
            }
          ></input>
        </div>

        <div>
          <label>question type:</label>
          <div>
            <input
              type="radio"
              value="singleChoice"
              name="questionType"
              onChange={(e) => {
                setAnswers([{ id: 1, content: "", isCorrect: false }]);
                setQuestion({ ...question, type: e.target.value });
              }}
            />
            Single choice
            <input
              type="radio"
              value="multChoice"
              name="questionType"
              onChange={(e) => {
                setAnswers([{ id: 1, content: "", isCorrect: false }]);
                setQuestion({ ...question, type: e.target.value });
              }}
            />
            Multiple choices
          </div>
        </div>

        <div>
          <label>Display</label>
          <div>
            <input
              type="radio"
              value="Vertical"
              name="display"
              onChange={(e) =>
                setQuestion({
                  ...question,
                  displayVertically: e.target.checked,
                })
              }
            />
            Vertical
            <input
              type="radio"
              value="Horizontal"
              name="display"
              onChange={(e) =>
                setQuestion({
                  ...question,
                  displayVertically: e.target.checked,
                })
              }
            />
            Horizontal
          </div>
        </div>

        <div>
          <input
            type={"checkbox"}
            onChange={(e) =>
              setQuestion({ ...question, allowExplanation: e.target.checked })
            }
          ></input>
          {question.allowExplanation && (
            <>
              <label>Explanation:</label>
              <textarea
                onChange={(e) =>
                  setQuestion({ ...question, explanation: e.target.value })
                }
              ></textarea>
            </>
          )}
          <label>Allow Explanation</label>
        </div>

        <div>
          <label>Answers</label>
          <button
            onClick={(e) => {
              e.preventDefault();
              const newAnswer = {
                id: answers[answers.length - 1].id + 1,
                content: "",
                isCorrect: false,
              };
              setAnswers([...answers, newAnswer]);
            }}
          >
            Add answer
          </button>
          <div>
            {answers.map((answer) => {
              return (
                <AnswerForm
                  key={answer.id}
                  answer={answer}
                  answers={answers}
                  type={question.type}
                  setAnswers={setAnswers}
                  deleteAnswer={deleteAnswer}
                />
              );
            })}
          </div>
        </div>
        <button onClick={(e) => submitForm(e)}>submit</button>
      </form>
    </>
  );
};
