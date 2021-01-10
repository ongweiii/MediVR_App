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
      <h5>Conversation for {id}</h5>
      {loaded ? (
        chat.map((item, index) => (
          <div
            className={`d-flex flex-row justify-content-${
              item.event === "bot" ? "start" : "end"
            } align-items-center`}
          >
            <div
              style={{
                maxWidth: "75%"
              }}
              className={`text-${item.event === "bot" ? "left" : "right"}`}
            >
              <div
                className="bg-light p-2"
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
                {new Date(item.timestamp * 1000).toLocaleString()}
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
