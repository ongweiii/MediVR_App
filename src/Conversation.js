import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function Conversation() {
  let { id } = useParams();
  const [chat, setChat] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch("https://medi-vr-api.vercel.app/api/conversation/" + id)
      .then((res) => res.json())
      .then((data) => {
        setChat(data);
        setLoaded(true);
      });
  }, []);
  return (
    <div className="container">
      <h1 className="text-center p-4">MediVR Core</h1>
      <ul className="list-group p-4">
        {loaded ? (
          chat.map((item, index) => (
            <li
              className={`list-group-item d-flex flex-row justify-content-${
                item.event === "bot" ? "start" : "end"
              } align-items-center`}
            >
              <div
                className={`w-75 text-${
                  item.event === "bot" ? "left" : "right"
                }`}
              >
                <span className="h6">{item.event}</span>
                <br />
                <span className="text-end">{item.text}</span>
                <br />
                <small className="text-muted">
                  {new Date(item.timestamp * 1000).toLocaleString()}
                </small>
              </div>
            </li>
          ))
        ) : (
          <h6>Loading...</h6>
        )}
      </ul>
    </div>
  );
}
