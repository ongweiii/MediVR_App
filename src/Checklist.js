import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getChecklist, getChecklistTemplate } from "./Api";

export default function Checklist() {
  let { id } = useParams();
  const [checklist, setChecklist] = useState([]);
  const [checklistTemplate, setChecklistTemplate] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getChecklistTemplate().then((data) => {
      setChecklistTemplate(data);
    });
    getChecklist(id).then((data) => {
      setChecklist(data);
      setLoaded(true);
    });
  }, []);

  const renderSection = (section) => {
    return (
      <div className="mb-3">
        <h6>{section}</h6>
        {checklistTemplate[section].map((check) => (
          <div className="d-flex flex-row">
            <input
              className="m-2"
              type="checkbox"
              checked={check.isCompulsory}
            />
            <span>{check.description}</span>
          </div>
        ))}
      </div>
    );
  };

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
              {renderSection("1.Demo")}
              {renderSection("2. PS")}
              {renderSection("4. DTH")}
              {/* {item.data.map((item2, index2) => (
                <div
                  key={index2}
                  className={`d-flex flex-row justify-content-between align-items-center`}
                >
                  <strong>{item2.action}</strong>
                  <small className="text-muted">
                    {moment(item2.timestamp * 1000).format("h:mma")}
                  </small>
                </div>
              ))} */}
            </div>
          </div>
        ))
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
}
