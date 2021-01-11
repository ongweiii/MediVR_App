import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

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
          <div key={index}>
            <div className="text-center">
              <span className="badge px-2 text-white rounded-pill bg-secondary">
                Session #{index + 1}:{" "}
                {moment(item.timestamp * 1000).format("Do MMM YYYY, h:mma")}
              </span>
            </div>
            <div className="px-4 py-2">
              {item.data.map((item2, index2) => (
                <div
                  key={index2}
                  className={`d-flex flex-row justify-content-${
                    item2.event === "bot" ? "start" : "end"
                  } align-items-center `}
                >
                  <div
                    style={{
                      maxWidth: "75%"
                    }}
                    className={`text-${
                      item2.event === "bot" ? "left" : "right"
                    }`}
                  >
                    <div
                      className="bg-light p-2"
                      style={{
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        borderBottomLeftRadius: item2.event === "bot" ? 0 : 12,
                        borderBottomRightRadius: item2.event === "bot" ? 12 : 0
                      }}
                    >
                      <span className="h6">{item2.event}</span>
                      <br />
                      <span className="text-end">{item2.text}</span>
                      <br />
                    </div>

                    <small className="text-muted">
                      {moment(item2.timestamp * 1000).format("h:mma")}
                    </small>
                  </div>
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
