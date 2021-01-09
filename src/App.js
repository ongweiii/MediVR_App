import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";

import Senders from "./Senders";
import Conversation from "./Conversation";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Senders} />
        <Route path="/conversation/:id" component={Conversation} />
      </Switch>
    </Router>
  );
}
