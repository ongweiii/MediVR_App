import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { getSessions } from "./Api";
export default function SessionsList() {
  let { id } = useParams();

  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getSessions(id).then((data) => {
      setList(data);
      setLoaded(true);
    });
  }, []);
  return (
    <div className="container">
      <h1 className="text-center p-4">MediVR Core</h1>
      {loaded ? (
        list.map((item, index) => (
          <div className="mb-2">
            <Link
              className="text-decoration-none"
              to={`/session/${id}/${item.timestamp}`}
            >
              <div
                key={index}
                className="btn btn-light btn-block border text-left"
              >
                <h6 className="text-truncate">Session {index + 1}</h6>
                <small>
                  {moment(item.timestamp * 1000).format("Do MMM YYYY, h:mma")}
                </small>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
}
