import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input, Textarea } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import "../../../sass/AddTest.scss";

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
    (async () => {
      const questionService = new BackendService("questions");
      const data = await questionService.getAllAsync();
      console.log(data);
      setQuestions(data);
    })();
  }, []);

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
      <main className="add-test">
        <Header>add new test</Header>
        <h3>topic: {topic}</h3>
        <div className="form">
          <div>
            <div className="add-test__language">
              <Label>Language:</Label>
              <select
                sx={{ width: 300 }}
                label={"language"}
                defaultValue={"eng"}
                onChange={(e) =>
                  setNewTest({ ...newTest, language: e.target.value })
                }
              >
                <option value={"eng"}>English</option>
                <option value={"heb"}>Hebrew</option>
              </select>
            </div>

            <div className="flex-row">
              <div className="add-test__form-group">
                <Label>Test Name:</Label>
                <Input
                  type="text"
                  onChange={(e) =>
                    setNewTest({ ...newTest, name: e.target.value })
                  }
                  value={newTest?.name ?? ""}
                ></Input>
              </div>

              <div className="add-test__form-group">
                <Label>Passing Grade</Label>
                <Input
                  onChange={(e) =>
                    setNewTest({ ...newTest, passingGrade: +e.target.value })
                  }
                  type={"number"}
                  value={newTest?.passingGrade ?? ""}
                ></Input>
              </div>
            </div>

            <div className="add-test__form-group">
              <div className="add-test__checkbox-group">
                <Input
                  type={"checkbox"}
                  onChange={(e) =>
                    setNewTest({ ...newTest, showAnswers: e.target.checked })
                  }
                ></Input>
                <Label>show correct answers after submission</Label>
              </div>
            </div>

            <div className="add-test__form-group">
              <Label>instructions</Label>
              <Textarea
                value={newTest?.instructions ?? ""}
                onChange={(e) =>
                  setNewTest({ ...newTest, instructions: e.target.value })
                }
              ></Textarea>
            </div>

            <div className="add-test__form-group">
              <Label>on success text</Label>
              <Textarea
                value={newTest?.passText ?? ""}
                onChange={(e) =>
                  setNewTest({ ...newTest, passText: e.target.value })
                }
              ></Textarea>
            </div>

            <div className="add-test__form-group">
              <Label>on fail text</Label>
              <Textarea
                value={newTest?.failText ?? ""}
                onChange={(e) =>
                  setNewTest({ ...newTest, failText: e.target.value })
                }
              ></Textarea>
            </div>
            <div className="add-test__btn-container">
              <Button onClick={(e) => submitForm(e)}>Save Quiz</Button>
              <Button onClick={() => navigate(-1)}>Back</Button>
            </div>
          </div>

          <div className="select-questions">
            <Header>Select Questions:</Header>
            <div className="add-test__questions">
              {questions.map((question) => {
                return (
                  <div key={question._id} className="add-test__answers-group">
                    <Input
                      type={"checkbox"}
                      onChange={(e) =>
                        selectQuestion(e.target.checked, question)
                      }
                    ></Input>
                    <div className="questions__answers">
                      <p>{question.content}</p>
                      {question.answers.map((answer, ind) => {
                        return (
                          <p>
                            {ind + 1}. {answer.content}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
