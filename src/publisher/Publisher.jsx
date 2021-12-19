import { useLocation, Link } from "react-router-dom";
import Search from "../search/Search";
import News from "../utils/dataContext";
import { useNavigate } from "react-router-dom";

import "./Publisher.css";

export default function Publisher() {
  const location = useLocation();
  const publisherKey = location.pathname.replace("/", "");
  const navigate = useNavigate();

  return (
    <div className="publisher">
      <h1>
        Publisher: {publisherKey.replaceAll("-", " ")}
        <Link to="/" className="back">
          Back
        </Link>
      </h1>
      <News.Consumer>
        {({ list, obj }) => {
          if (!obj) {
            return "";
          }

          if (Object.keys(obj).length === 0) {
            return <div>Loading...</div>;
          }
          const publishers = obj[publisherKey];
          if (!publishers) {
            navigate("/");
            return;
          }

          return (
            <>
              <Search news={list} />
              <div>
                {publishers.map((publisher) => {
                  const date = new Date(publisher.TIMESTAMP);
                  return (
                    <div className="container" key={publisher.ID}>
                      <div className="card">
                        <h3>{publisher.TITLE}</h3>
                        <div>
                          Updated on
                          <span>
                            {` ${date.getDate()}/${
                              date.getMonth() + 1
                            }/${date.getFullYear()}`}
                          </span>
                        </div>
                        <a href={publisher.URL}>Details</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        }}
      </News.Consumer>
    </div>
  );
}
