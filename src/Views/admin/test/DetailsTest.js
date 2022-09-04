import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import "../../../sass/DetailsTest.scss";
import { Label } from "../../../components/Label/Label";

export const DetailsTest = () => {
  const { id, topic } = useParams();
  const [test, setTest] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const quizService = new BackendService("quizes");
    (async () => {
      const data = await quizService.getByIdAsync(id);
      setTest(data);
    })();
  }, []);

  return (
    <>
      <main className="test__details__main">
        <div className="details__main">
          <Label>topic: {topic}</Label>
          <Label>name: {test.name}</Label>
          <Label>language: {test.language}</Label>
          <Label>passing grade: {test.passingGrade}</Label>
          <Label>showAnswers: {test.showAnswers}</Label>
          <Label>instructions: {test.instructions}</Label>
          <Label>passText: {test.passText}</Label>
          <Label>failText: {test.failText}</Label>
          <Label>questions:</Label>
        </div>
        <div className="questions__and__answers">
          {test?.questions?.map((q, ind) => {
            return (
              <div className="question__details" key={q._id}>
                <h4>
                  {ind + 1}:{q.content}
                </h4>
                {q?.answers?.map((a) => {
                  return (
                    <div key={a.id}>
                      <p>
                        {a.id}: {a.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};
