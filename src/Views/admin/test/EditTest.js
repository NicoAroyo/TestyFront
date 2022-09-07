import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import "../../../sass/AddTest.scss";
import { Header } from "../../../components/Header/Header";
import { Label } from "../../../components/Label/Label";
import { Input, Textarea } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";

export const EditTest = () => {
  const { id, topic } = useParams();
  const [test, setTest] = useState({});
  const [originalTest, setOriginalTest] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const quizService = new BackendService("quizes");
    const questionService = new BackendService("questions");
    (async () => {
      const testData = await quizService.getByIdAsync(id);
      setTest(testData);
      setOriginalTest(testData);
      const questionsData = await questionService.getByTopicAsync(topic);
      setQuestions(questionsData);
      setSelectedQuestions(testData.questions);
    })();
  }, []);

  const saveChanges = async (e) => {
    e.preventDefault();
    const quizService = new BackendService("quizes");
    try {
      test.questions = selectedQuestions;
      await quizService.patchAsync(test, id);
    } catch (error) {
      console.error(error);
    }
  };

  const selectQuestion = (checked, question) => {
    console.log(selectedQuestions);
    if (checked) {
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q._id !== question._id)
      );
    }
  };

  return (
    <>
      <main className="add-test">
        <Header>Edit test "{originalTest.name}"</Header>
        <h3>topic: {topic}</h3>

        <div className="form">
          <div>
            <div className="add-test__language">
              <Label>language</Label>
              <select
                sx={{ width: 300 }}
                value={test.language}
                onChange={(e) => setTest({ ...test, language: e.target.value })}
              >
                <option value={"eng"}>English</option>
                <option value={"heb"}>Hebrew</option>
              </select>
            </div>

            <div className="flex-row">
              <div className="add-test__form-group">
                <Label>test name</Label>
                <Input
                  type="text"
                  onChange={(e) => setTest({ ...test, name: e.target.value })}
                  value={test.name}
                ></Input>
              </div>

              <div className="add-test__form-group">
                <Label>passing grade</Label>
                <Input
                  onChange={(e) =>
                    setTest({ ...test, passingGrade: +e.target.value })
                  }
                  type={"number"}
                  value={test?.passingGrade}
                ></Input>
              </div>
            </div>

            <div className="add-test__form-group">
              <div className="add-test__checkbox-group">
                <Input
                  type={"checkbox"}
                  checked={test?.showAnswers}
                  onChange={(e) =>
                    setTest({ ...test, showAnswers: e.target.checked })
                  }
                ></Input>
                <Label>show correct answers after submission</Label>
              </div>
            </div>

            <div className="add-test__form-group">
              <Label>instructions</Label>
              <Textarea
                value={test?.instructions}
                onChange={(e) =>
                  setTest({ ...test, instructions: e.target.value })
                }
              ></Textarea>
            </div>

            <div className="add-test__form-group">
              <Label>on success</Label>
              <Textarea
                value={test?.passText}
                onChange={(e) => setTest({ ...test, passText: e.target.value })}
              ></Textarea>
            </div>

            <div className="add-test__form-group">
              <Label>on fail</Label>
              <Textarea
                value={test?.failText}
                onChange={(e) => setTest({ ...test, failText: e.target.value })}
              ></Textarea>
            </div>

            <div className="add-test__btn-container">
              <Button onClick={(e) => saveChanges(e)}>submit</Button>
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
                      checked={
                        selectedQuestions.some(
                          (q) => q._id === question._id
                        ) === true
                      }
                      onChange={(e) =>
                        selectQuestion(e.target.checked, question)
                      }
                    ></Input>
                    <div className="questions__answers">
                      <h4 className="keep-linebreak content">
                        {question.content}
                      </h4>
                      {question.answers.map((answer, ind) => {
                        return (
                          <p className="keep-linebreak answer" key={ind}>
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
