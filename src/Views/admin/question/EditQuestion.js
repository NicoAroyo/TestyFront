import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { AnswerForm } from "./AnswerForm";

export const EditQuestionView = () => {
  const { id, topic } = useParams();
  const [question, setQuestion] = useState({});
  const [originalQuestion, setOriginalQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const questionService = new BackendService("questions");

      try {
        const data = await questionService.getByIdAsync(id);
        setQuestion(data);
        setOriginalQuestion(data);
        setAnswers(data.answers);
        console.log(data.answers);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const deleteAnswer = (e, answerId) => {
    e.preventDefault();
    if (answers.length <= 1) return;
    setAnswers(answers.filter((a) => a.id !== answerId));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const questionService = new BackendService("questions");
    question.answers = answers;
    try {
      questionService.patchAsync(question, id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <h3>Edit Question {question._id}</h3>
      <h3>Topic: {topic}</h3>

      <form>
        <div>
          <label>Question content:</label>
          <input
            type="text"
            value={question?.content}
            onChange={(e) =>
              setQuestion({ ...question, content: e.target.value })
            }
          ></input>
        </div>
        <div>
          <label>Question type:</label>
          <div>
            <input
              type="radio"
              checked={question.type === "singleChoice"}
              value="singleChoice"
              name="questionType"
              onChange={(e) => {
                setAnswers([{ id: 1, content: "", isCorrect: false }]);
                setQuestion({ ...question, type: e.target.value });
              }}
            />
            Single choice
            <input
              checked={question.type === "multChoice"}
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
              checked={question.displayVertically}
              onChange={(e) =>
                setQuestion({
                  ...question,
                  displayVertically:
                    e.target.value === "Vertical" ? true : false,
                })
              }
            />
            Vertical
            <input
              type="radio"
              value="Horizontal"
              checked={question.displayVertically}
              name="display"
              onChange={(e) =>
                setQuestion({
                  ...question,
                  displayVertically:
                    e.target.value === "Horizontal" ? false : true,
                })
              }
            />
            Horizontal
          </div>
        </div>

        <div>
          <input
            type={"checkbox"}
            checked={question.allowExplanation}
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
