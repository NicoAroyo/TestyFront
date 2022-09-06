import React, { useState } from "react";
import { BackendService } from "../../service/backendService";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "../../service/authenticationService";
import "../../sass/Login.scss";

export const SignUpView = () => {
  const navigate = useNavigate();
  const [newUser, setUser] = useState();

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("hi");
    console.log(newUser);
    try {
      const auth = new AuthenticationService();
      const response = await auth.signUpUser({ email: newUser.email });
      console.log(response);
      if (response.exists) {
        alert("E-mail taken");
      } else {
        const service = new BackendService("users");
        const res = await service.postAsync(newUser);
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <form className="login">
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
            <button onClick={(e) => submitForm(e)}>Sign Up</button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};
