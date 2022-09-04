import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, SmallButton } from "../../../components/Button/Button";
import { BackendService } from "../../../service/backendService";
import { AnswerForm } from "./AnswerForm";
import { Label } from "../../../components/Label/Label";
import { Input, Textarea } from "../../../components/Input/Input";
import { Table } from "../../../components/Table/Table";
import "../../../sass/AddQuestion.scss";

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
      <nav>
        <h3>Topic: {topic}</h3>
        <div className="button-container">
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button onClick={() => setQuestion(originalQuestion)}>
            Reset Changes
          </Button>
        </div>
      </nav>

      <main className="add">
        <h3>Edit Question: "{originalQuestion.content}"</h3>
        <div className="add__form">
          <div className="add__form-group">
            <div className="add__content">
              <Label>Question content:</Label>
              <Textarea
                type="text"
                value={question?.content}
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
                    checked={question.type === "singleChoice"}
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
                    checked={question.type === "multChoice"}
                    type="radio"
                    value="multChoice"
                    name="questionType"
                    onChange={(e) => {
                      setAnswers([{ id: 1, content: "", isCorrect: false }]);
                      setQuestion({ ...question, type: e.target.value });
                    }}
                  />
                  <label> Multiple choice</label>
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
                    checked={question.displayVertically}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        displayVertically:
                          e.target.value === "Vertical" ? true : false,
                      })
                    }
                  />
                  <label> Vertical</label>
                </div>

                <div className="add__radio">
                  <Input
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
                  <label> Horizontal</label>
                </div>
              </div>
            </div>
          </div>

          <div className="add__form-group">
            <div className="add__explanation-wrapper">
              <div className="add__explanation">
                <Input
                  type={"checkbox"}
                  checked={question.allowExplanation}
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
                    value={question.explanation}
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
            <Button onClick={(e) => submitForm(e)}>submit</Button>
          </div>
        </div>
      </main>
    </>
  );
};
