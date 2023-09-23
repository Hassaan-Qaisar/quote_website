import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gqloperations/mutations";
import "./Login.css"

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [signinUser, { error, loading, data }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      localStorage.setItem("token", data.user.token);
      navigate("/");
    },
  });

  if (loading) {
    return (
      <div class="loader-container">
        <span class="loader"></span>
      </div>
    );
  }

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  //   useEffect(() => {
  //     console.log("Updated formData:", formData);
  //   }, [formData]);

  return (
    <div className="login-container">
      {error && <div className="error-message">{error.message}</div>}
      <h5>Login</h5>
      <form onSubmit={submitHandler}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={changeHandler}
            required
          />
        </div>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
