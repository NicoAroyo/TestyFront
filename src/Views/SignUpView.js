import React, { useState } from "react";
import { BackendService } from "../service/backendService";
import { useNavigate } from "react-router-dom";

export const SignUpView = () => {
  const navigate = useNavigate();
  const [newUser, setUser] = useState();

  const submitForm = async (e) => {
    e.preventDefault();
    const usersService = new BackendService("users");
    console.log(newUser);
    try {
      await usersService.postAsync(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2>sign up</h2>
        <form>
          <div>
            <label>first name</label>
            <input
              onChange={(e) =>
                setUser({ ...newUser, firstName: e.target.value })
              }
              value={newUser?.firstName ?? ""}
            ></input>
          </div>
          <div>
            <label>last name</label>
            <input
              onChange={(e) =>
                setUser({ ...newUser, lastName: e.target.value })
              }
              value={newUser?.lastName ?? ""}
            ></input>
          </div>
          <div>
            <label>e-mail</label>
            <input
              onChange={(e) => setUser({ ...newUser, email: e.target.value })}
              value={newUser?.email ?? ""}
            ></input>
          </div>
          <div>
            <label>password</label>
            <input
              onChange={(e) =>
                setUser({ ...newUser, password: e.target.value })
              }
              value={newUser?.password ?? ""}
            ></input>
          </div>
          <button onClick={(e) => submitForm(e)}>submit</button>
        </form>

        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </>
  );
};
