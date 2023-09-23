import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../gqloperations/mutations";
import "./Signup.css"; // Import the CSS file

export const Signup = () => {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);

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
    console.log(formData);
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };

  //   useEffect(() => {
  //     console.log("Updated formData:", formData);
  //   }, [formData]);

  return (
    <div className="signup-container">
      {error && <div className="error-message">{error.message}</div>}

      {data && data.user && (
        <div className="success-message">
          {data.user.firstName} is SignedUp. You can login now!
        </div>
      )}

      <h5>Signup</h5>
      <form onSubmit={submitHandler}>
        <div className="input-container">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={changeHandler}
            required
          />
        </div>
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
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
