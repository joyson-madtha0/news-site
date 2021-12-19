import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";

import { get } from "./utils/httpService";
import News from "./utils/dataContext";
import "./App.css";

import HomePage from "./home-page/HomePage";
import Publisher from "./publisher/Publisher";
import Error from "./error/Error";

import { URL } from "./constants/common";

export default function App() {
  const [publishers, setPublishers] = useState({ list: [], obj: {} });

  useEffect(() => {
    const req = get(URL);
    req.then((data) => {
      const dataByPublisher = {};

      data.forEach((item) => {
        const key = item.PUBLISHER.replaceAll("\\", "").replaceAll(" ", "-");
        if (dataByPublisher[key]) {
          dataByPublisher[key].push(item);
        } else {
          dataByPublisher[key] = [item];
        }
      });
      Object.keys(dataByPublisher).forEach((key) => {
        dataByPublisher[key] = dataByPublisher[key].sort(
          (a, b) => b.TIMESTAMP - a.TIMESTAMP
        );
      });
      setPublishers({ list: data, obj: dataByPublisher });
    });
    req.catch(() => setPublishers({ list: [], obj: null }));
  }, []);

  return (
    <News.Provider value={publishers}>
      <BrowserRouter>
        {publishers.obj ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Publisher />} />
          </Routes>
        ) : (
          <Error />
        )}
      </BrowserRouter>
    </News.Provider>
  );
}
