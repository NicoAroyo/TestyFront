import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";

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
      <div>
        <h2>topic: {topic}</h2>
        <h2>name: {test.name}</h2>
        <h2>language: {test.language}</h2>
        <h2>passing grade: {test.passingGrade}</h2>
        <h2>showAnswers: {test.showAnswers}</h2>
        <h2>instructions: {test.instructions}</h2>
        <h2>passText: {test.passText}</h2>
        <h2>failText: {test.failText}</h2>
        <h2>questions:</h2>
        {test?.questions?.map((q, ind) => {
          return (
            <div key={q._id}>
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
    </>
  );
};
