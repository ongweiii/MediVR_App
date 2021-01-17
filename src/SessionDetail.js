import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { getConversation, getChecklist, getChecklistTemplate } from "./Api";
export default function SessionDetail() {
  let { id, ts } = useParams();

  const [convo, setConvo] = useState([]);
  const [convoLoaded, setConvoLoaded] = useState(false);
  const [checklist, setChecklist] = useState([]);
  const [checklistTemplate, setChecklistTemplate] = useState({});
  const [checklistLoaded, setChecklistLoaded] = useState(false);
  useEffect(() => {
    getConversation(id, ts).then((data) => {
      setConvo(data);
      setConvoLoaded(true);
    });
    getChecklistTemplate().then((data) => {
      setChecklistTemplate(data);
      getChecklist(id, ts).then((data2) => {
        setChecklist(data2);
        setChecklistLoaded(true);
      });
    });
  }, []);

  const renderSection = (section) => {
    return (
      <div className="mb-3">
        <h6>Section {section}</h6>
        {checklistTemplate[section].map((check) => (
          <div className="d-flex flex-row">
            <input
              className="m-2"
              type="checkbox"
              checked={checkActionInSession(check["intent"])}
            />
            <span className={check.isCompulsory ? "font-weight-bold" : ""}>
              {check.description}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const checkActionInSession = (actionName) => {
    return checklist.some((el) => el["action"] === actionName);
  };

  return (
    <div className="container">
      <h1 className="text-center p-4">MediVR Core</h1>
      <h5>Checklist</h5>
      {checklistLoaded ? (
        <div className="p-2">
          {renderSection("1.Demo")}
          {renderSection("2. PS")}
          {renderSection("4. DTH")}
        </div>
      ) : (
        <h6>Loading...</h6>
      )}
      <h5>Conversation</h5>
      {convoLoaded ? (
        convo.map((item, index) => (
          <div
            key={index}
            className={`d-flex flex-row justify-content-${
              item.event === "bot" ? "start" : "end"
            } align-items-center `}
          >
            <div
              style={{
                maxWidth: "75%"
              }}
              className={`text-${item.event === "bot" ? "left" : "right"}`}
            >
              <div
                className="bg-primary text-white p-2"
                style={{
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottomLeftRadius: item.event === "bot" ? 0 : 12,
                  borderBottomRightRadius: item.event === "bot" ? 12 : 0
                }}
              >
                <span className="h6">{item.event}</span>
                <br />
                <span className="text-end">{item.text}</span>
                <br />
              </div>

              <small className="text-muted">
                {moment(item.timestamp * 1000).format("h:mma")}
              </small>
            </div>
          </div>
        ))
      ) : (
        <h6>Loading...</h6>
      )}
    </div>
  );
}
