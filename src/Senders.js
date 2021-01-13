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
          <div
            key={index}
            className="row bg-light py-2 m-2 rounded border align-items-center"
          >
            <div className="col">
              <h5 className="text-truncate">{item.sender_id}</h5>
              <small className="text-muted">
                {moment(item.last * 1000).format("Do MMM YYYY, h:mma")}
              </small>
            </div>
            <div className="col-md-auto text-center">
              <Link to={`/conversation/${item.sender_id}`}>
                <button className="btn btn-light text-primary mr-2">
                  Conversation
                </button>
              </Link>
              <Link to={`/checklist/${item.sender_id}`}>
                <button className="btn btn-light text-success">
                  Checklist
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
}
