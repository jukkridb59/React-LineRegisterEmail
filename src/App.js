import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import HomePage from "./components/HomePage";
import JuristicRegister from "./components/JuristicRegister";
import MemberRegister from "./components/MemberRegister";
import JuristicCallback from "./components/JuristicCallback";
import MemberCallback from "./components/MemberCallback";

import "./App.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Kanit", "sans-serif"].join(","),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/juristic-callback">
          <JuristicCallback />
        </Route>
        <Route exact path="/member-callback">
          <MemberCallback />
        </Route>
        <Route exact path="/juristic-register">
          <JuristicRegister />
        </Route>
        <Route exact path="/member-register">
          <MemberRegister />
        </Route>
      </BrowserRouter>
    </ThemeProvider>
  );
}
