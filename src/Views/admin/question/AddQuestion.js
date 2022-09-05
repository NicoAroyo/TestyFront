import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { AnswerForm } from "./AnswerForm";
import "../../../sass/AddQuestion.scss";
import { Input, Textarea } from "../../../components/Input/Input";
import { Label } from "../../../components/Label/Label";
import { Button, SmallButton } from "../../../components/Button/Button";
import { Table } from "../../../components/Table/Table";

export const AddQuestionView = () => {
  const { topic } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([
    { id: 1, content: "", isCorrect: false },
  ]);
  const navigate = useNavigate();

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
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="add">
      <h3>Add Question</h3>
      <h2>topic: {topic}</h2>
      <div className="add__form">
        <div className="add__form-group">
          <div className="add__content">
            <Label>question content:</Label>
            <Textarea
              type="text"
              placeholder={"what's 2+2?"}
              value={question?.content ?? ""}
              onChange={(e) =>
                setQuestion({ ...question, content: e.target.value })
              }
            ></Textarea>
          </div>
        </div>

        <div className="between">
          <div className="add__form-group">
            <div className="add_radio-wrapper">
              <Label>Question type:</Label>
              <div className="add__radio">
                <Input
                  type="radio"
                  value="singleChoice"
                  name="questionType"
                  onChange={(e) => {
                    setAnswers([{ id: 1, content: "", isCorrect: false }]);
                    setQuestion({ ...question, type: e.target.value });
                  }}
                />
                <label> Single choice</label>
              </div>
              <div className="add__radio">
                <Input
                  type="radio"
                  value="multChoice"
                  name="questionType"
                  checked = "true"
                  onChange={(e) => {
                    setAnswers([{ id: 1, content: "", isCorrect: false }]);
                    setQuestion({ ...question, type: e.target.value });
                  }}
                />
                <label>Multiple choices</label>
              </div>
            </div>
          </div>

          <div className="add__form-group">
            <div className="add_radio-wrapper">
              <Label>Display:</Label>
              <div className="add__radio">
                <Input
                  type="radio"
                  value="Vertical"
                  name="display"
                  checked="true"
                  onChange={(e) =>
                    setQuestion({
                      ...question,
                      displayVertically: e.target.checked,
                    })
                  }
                />
                <label> Vertical</label>
              </div>
              <div className="add__radio">
                <Input
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
                <label>Horizontal</label>
              </div>
            </div>
          </div>
        </div>

        <div className="add__form-group">
          <div className="add__explanation-wrapper">
            <div className="add__explanation">
              <Input
                type={"checkbox"}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    allowExplanation: e.target.checked,
                  })
                }
              ></Input>
              <Label>Allow Explanation</Label>
            </div>
            {question.allowExplanation && (
              <div className="add__content">
                <Textarea
                  placeholder={"explanation"}
                  onChange={(e) =>
                    setQuestion({ ...question, explanation: e.target.value })
                  }
                ></Textarea>
              </div>
            )}
          </div>
        </div>

        <div className="add__answers">
          <div className="add__answers__group">
            <Label>Answers</Label>
            <SmallButton
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
            </SmallButton>
          </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th>Correct</th>
                  <th>Content</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
            </Table>
          </div>
        </div>
        <Button onClick={(e) => submitForm(e)}>Save Question</Button>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    </main>
  );
};
