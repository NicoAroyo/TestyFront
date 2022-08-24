import React, { useEffect, useState } from "react";
import { QuestionsService } from "../../service/questionsService";

export const AddQuestionView = () => {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([
    { id: 1, content: "", isCorrect: false },
  ]);

  const deleteAnswer = (e, answerId) => {
    e.preventDefault();
    if (answers.length <= 1) return;
    setAnswers(answers.filter((a) => a.id != answerId));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const questionService = new QuestionsService();
    question.asnwers = answers;
    try {
      await questionService.postAsync(question);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>AddQuestionView</h3>
      <form>
        <div>
          <label>Question content:</label>
          <input
            type="text"
            value={question?.content ?? ""}
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
              value="singleChoice"
              name="questionType"
              onChange={(e) =>
                setQuestion({ ...question, type: e.target.value })
              }
            />
            Single choice
            <input
              type="radio"
              value="multChoice"
              name="questionType"
              onChange={(e) =>
                setQuestion({ ...question, type: e.target.value })
              }
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
                  displayVertically:
                    e.target.value === "Vertical" ? true : false,
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
                  displayVertically:
                    e.target.value === "Horizontal" ? false : true,
                })
              }
            />
            Horizontal
          </div>
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
                <>
                  <label>correct</label>
                  <input
                    type={
                      question.type === "singleChoice" ? "radio" : "checkbox"
                    }
                    name="correct"
                    onChange={(e) => {
                      answers.forEach((a) => (a.isCorrect = false));
                      answer.isCorrect = e.target.checked;
                      setAnswers(answers);
                    }}
                  ></input>

                  <input
                    type="text"
                    onChange={(e) => {
                      answer.content = e.target.value;
                      setAnswers(answers);
                    }}
                  ></input>
                  <button onClick={(e) => deleteAnswer(e, answer.id)}>
                    Delete
                  </button>
                </>
              );
            })}
          </div>
        </div>
        <button onClick={(e) => submitForm(e)}>submit</button>
      </form>
    </>
  );
};
