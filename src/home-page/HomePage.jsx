import React from "react";
import { useNavigate } from "react-router-dom";
import Search from "../search/Search";
import News from "../utils/dataContext";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <h1>Publishers</h1>

      <News.Consumer>
        {({ list, obj }) => (
          <>
            <Search news={list} />
            {Object.keys(obj).map((publisher) => (
              <button key={publisher} onClick={() => navigate(`/${publisher}`)}>
                {publisher}
              </button>
            ))}
          </>
        )}
      </News.Consumer>
    </div>
  );
}
