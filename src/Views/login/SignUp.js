import React, { useState } from "react";
import { BackendService } from "../../service/backendService";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../service/authenticationService";
import "../../sass/Login.scss";
import { Modal } from "../../components/Modal/Modal";

export const SignUp = () => {
  const navigate = useNavigate();
  const [newUser, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const submitForm = async (e) => {
    try {
      const auth = new AuthenticationService();
      const response = await auth.signUpUser({ email: newUser.email });
      if (response.exists) {
        alert("E-mail taken");
      } else {
        const service = new BackendService("users");
        await service.postAsync(newUser);
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        display={open}
        showOnlyOneButton={true}
        confirm={() => navigate("/")}
        header={"Signed up succesfully"}
        buttonContent={"Ok"}
      ></Modal>
      <div className="login-wrapper">
        <div className="login">
          <h2>Sign Up</h2>

          <div className="form-group">
            <label>first name</label>
            <input
              onChange={(e) =>
                setUser({ ...newUser, firstName: e.target.value })
              }
              value={newUser?.firstName ?? ""}
            ></input>
          </div>
          <div className="form-group">
            <label>last name</label>
            <input
              onChange={(e) =>
                setUser({ ...newUser, lastName: e.target.value })
              }
              value={newUser?.lastName ?? ""}
            ></input>
          </div>
          <div className="form-group">
            <label>e-mail</label>
            <input
              onChange={(e) => setUser({ ...newUser, email: e.target.value })}
              value={newUser?.email ?? ""}
            ></input>
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              onChange={(e) =>
                setUser({ ...newUser, password: e.target.value })
              }
              value={newUser?.password ?? ""}
            ></input>
          </div>
          <div className="login-button-container">
            <button onClick={() => submitForm()}>Sign Up</button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};
