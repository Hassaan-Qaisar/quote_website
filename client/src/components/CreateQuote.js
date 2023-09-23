import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CREATE_QUOTE } from "../gqloperations/mutations";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import "./CreateQuote.css";

export const CreateQuote = () => {
  const [quote, setQuote] = useState("");
  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
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

  if (loading) {
    return (
      <div class="loader-container">
        <span class="loader"></span>
      </div>
    );
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    });
  };

  if (error) {
    console.log(error.message);
  }
  if (data) {
    console.log(data);
  }

  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && <div className="green card-panel">{data.quote}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={quote}
          onChange={(event) => setQuote(event.target.value)}
          placeholder="Write your quote here"
        />
        <button className="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};
