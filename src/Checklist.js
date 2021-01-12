import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getChecklist } from "./Api";

export default function Checklist() {
  let { id } = useParams();
  const [checklist, setChecklist] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getChecklist(id).then((data) => {
      setChecklist(data);
      setLoaded(true);
    });
  }, []);
  return (
    <div className="container">
      <h1 className="text-center p-4">MediVR Core</h1>
      <h5>Checklist for {id}</h5>
      {loaded ? (
        checklist.map((item, index) => (
          <div key={index}>
            <div className="text-center">
              <span className="badge px-2 text-white rounded-pill bg-secondary">
                Session #{index + 1}:{" "}
                {moment(item.timestamp * 1000).format("Do MMM YYYY, h:mma")}
              </span>
            </div>
            <div className="p-2">
              {item.data.map((item2, index2) => (
                <div
                  key={index2}
                  className={`d-flex flex-row justify-content-between align-items-center`}
                >
                  <strong>{item2.action}</strong>
                  <small className="text-muted">
                    {moment(item2.timestamp * 1000).format("h:mma")}
                  </small>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
}
