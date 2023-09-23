import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../gqloperations/queries";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PROFILE, {
    fetchPolicy:"cache-and-network"
  });

  useEffect(() => {
    // Check if a refresh is needed
    const refreshFlag = localStorage.getItem("refreshFlag");

    if (refreshFlag === "true") {
      // Remove the flag to avoid future refreshes
      localStorage.removeItem("refreshFlag");

      // Use window.location.reload() to refresh the page
      window.location.reload();
    }
  }, []);

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>unauthorized</h1>;
  }

  if (loading) {
    return (
      <div class="loader-container">
        <span class="loader"></span>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <h1>Error occurred</h1>;
  }

  if (!data || !data.user) {
    return (
      <div class="error-container">
        <h1 class="error-heading">No profile data available</h1>
      </div>
    );
  }

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          src={`https://robohash.org/${data?.user?.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6>Email - {data.user.email}</h6>
      </div>
      <h3>Your quotes</h3>
      {data.user.quotes.map((quo) => {
        return (
          <blockquote>
            <h6>{quo.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
};
