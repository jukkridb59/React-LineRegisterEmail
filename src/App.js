import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Callback from "./components/Callback";
import Register from "./components/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Register />
      </Route>
      <Route exact path="/callback">
        <Callback />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </BrowserRouter>
  );
}
