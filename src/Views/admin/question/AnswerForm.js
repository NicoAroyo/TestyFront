import React from "react";
import { SmallButton } from "../../../components/Button/Button";
import { Input, Textarea } from "../../../components/Input/Input";

export const AnswerForm = ({
  answer,
  answers,
  setAnswers,
  type,
  deleteAnswer,
}) => {
  return (
    <tr>
      <td>
        <Input
          style={{ height: "25px", width: "25px" }}
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
        ></Input>
      </td>
      <td>
        <Textarea
          style={{ backgroundColor: "#fff" }}
          type="text"
          defaultValue={answer.content}
          onChange={(e) => {
            answer.content = e.target.value;
            setAnswers(answers);
          }}
        ></Textarea>
      </td>
      <td>
        <SmallButton onClick={(e) => deleteAnswer(e, answer.id)}>
          Delete
        </SmallButton>
      </td>
    </tr>
  );
};
