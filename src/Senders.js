import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { getSenders } from "./Api";
export default function Senders() {
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getSenders().then((data) => {
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
              to={`/sessions/${item.sender_id}`}
            >
              <div
                key={index}
                className="btn btn-light btn-block border text-left"
              >
                <h5 className="text-truncate">{item.sender_id}</h5>
                <small className="text-muted">
                  {moment(item.last * 1000).format("Do MMM YYYY, h:mma")}
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
