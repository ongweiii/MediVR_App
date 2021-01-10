import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Senders() {
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch("https://medi-vr-api.vercel.app/api/senders")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setLoaded(true);
      });
  }, []);
  return (
    <div className="container">
      <h1 className="text-center p-4">MediVR Core</h1>
      {loaded ? (
        list.map((item, index) => (
          <div className="row bg-light p-2 m-2 rounded align-items-center">
            <div className="col">
              <h5 className="text-truncate">{item.sender_id}</h5>
              <small className="text-muted">
                {new Date(item.last * 1000).toLocaleString()}
              </small>
            </div>
            <div className="col-md-auto text-center">
              <Link to={`/conversation/${item.sender_id}`}>
                <button className="btn btn-light text-primary mr-2">
                  Conversation
                </button>
              </Link>
              {/* <Link to={`/checklist/${item.sender_id}`}> */}
              <button className="btn btn-light text-success" disabled>
                Checklist
              </button>
              {/* </Link> */}
            </div>
          </div>
        ))
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
}
