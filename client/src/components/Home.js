import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_QUOTES } from "../gqloperations/queries";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  // call an graphql api without apollo clientS
  // useEffect(()=>{
  //   fetch('http://localhost:4000',{
  //     method:"post",
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify({
  //       query:`
  //       query getAllQuotes{
  //         quotes{
  //           name
  //           by{
  //             _id
  //             firstName
  //           }
  //         }
  //       }
  //       `
  //       ,
  //       variables:{
  //         // any variables that we have to pass in query
  //       }
  //     })
  //   }).then(res=>res.json()
  //   .then(data=>console.log(data)))
  // }, [])

  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy:"cache-and-network"
  });

  if (loading) {
    return (
      <div class="loader-container">
        <span class="loader"></span>
      </div>
    );
  }

  // if (error) {
  //   console.log(error);
  // }

  // if (data) {
  //   console.log(data)
  // }

  if (data?.quotes.length === 0) {
    return <h2>No Quotes Available</h2>;
  }

  return (
    <div className="quote-container">
      {data?.quotes.map((quote) => {
        return (
          <blockquote className="quote-block" key={quote._id}>
            <h6 className="quote-text">{quote.name}</h6>
            <Link to={`/profile/${quote.by._id}`} className="author-link">
              <p className="author-name">~{quote.by.firstName}</p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
};
