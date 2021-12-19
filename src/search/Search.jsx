import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function Search(props) {
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const [result, setResult] = useState([]);

  const filter = (value) => {
    const result = [];
    if (value) {
      props.news.forEach((item) => {
        if (item.TITLE.includes(value)) {
          result.push(item);
        }
      });
    }
    setResult(result);
  };
  const redirect = (item) => {
    navigate(`/${item.PUBLISHER.replaceAll("\\", "").replaceAll(" ", "-")}`);
  };
  return (
    <>
      <input
        type="search"
        placeholder="Search..."
        onInput={(event) => filter(event.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 200)}
      />
      {focus && (
        <div className="option-container">
          {result.length ? (
            <div className="options">
              {result.map((item) => (
                <div key={item.ID} onClick={() => redirect(item)}>
                  {item.TITLE}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
