import React from "react";

export const AnswerForm = ({
  answer,
  answers,
  setAnswers,
  type,
  deleteAnswer,
}) => {
  return (
    <div key={answer.id}>
      <label>correct</label>
      <input
        defaultChecked={answer.isCorrect}
        type={type === "singleChoice" ? "radio" : "checkbox"}
        name="correct"
        onChange={(e) => {
          if (type === "singleChoice") {
            answers.forEach((a) => (a.isCorrect = false));
            answer.isCorrect = e.target.checked;
          } else {
            answer.isCorrect = e.target.checked;
          }
          setAnswers(answers);
        }}
      ></input>

      <input
        type="text"
        defaultValue={answer.content}
        onChange={(e) => {
          answer.content = e.target.value;
          setAnswers(answers);
        }}
      ></input>
      <button onClick={deleteAnswer}>Delete</button>
    </div>
  );
};
