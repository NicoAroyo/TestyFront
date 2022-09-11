import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendService } from "../../../service/backendService";
import { Modal } from "../../../components/Modal/Modal";
export const ChooseTestView = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const { userId } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const beginTest = async () => {
    const service = new BackendService("reports");
    const quizId = code;
    const report = await service.getByQnSAsync(quizId, userId);
    if (report === "undefined") {
      navigate(`/take-test/${userId}/${code}`);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <Modal
        display={openModal}
        confirm={() => setOpenModal(false)}
        content={"You've already taken this test."}
        header={"Take test"}
        buttonContent={"Ok"}
        showOnlyOneButton={true}
      ></Modal>
      <div className="login-wrapper">
        <div className="login">
          <h2>Enter test code</h2>

          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input onChange={(e) => setCode(e.target.value)}></input>
          </div>
          <button onClick={beginTest}>Enter</button>
        </div>
      </div>
    </>
  );
};
