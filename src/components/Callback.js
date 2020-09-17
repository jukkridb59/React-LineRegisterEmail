import React, { useState } from "react";
import "../App.css";
import { GROUPNAME, COMPANYNAME } from "../Auth";

import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import querystring from "querystring";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
}));

export default function Callback() {
  const classes = useStyles();

  const [groupName, setGroupName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [code, setCode] = useState("");

  const urlParams = new URLSearchParams(window.location.search);

  const getToken = () => {
    // console.log(code, room);

    try {
      axios
        .post(
          "http://localhost:5000/code",
          querystring.stringify({
            code: code,
            groupName: localStorage.getItem(GROUPNAME),
            companyName: localStorage.getItem(COMPANYNAME),
          }),
          { headers: { "content-type": "application/x-www-form-urlencoded" } }
        )
        .then((response) => {
          console.log("response: ", response);

          localStorage.removeItem(GROUPNAME);
          localStorage.removeItem(COMPANYNAME);
        });
    } catch (err) {
      console.log("err", err);
    }
  };

  const myParam = urlParams.get("code");
  if (myParam !== null) {
    setGroupName(localStorage.getItem(GROUPNAME));
    setCompanyName(localStorage.getItem(COMPANYNAME));
    setCode(myParam);

    getToken();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <strong>
            ท่านได้ทำการลงทะเบียนไลน์ การแจ้งเตือนผ่าน Line Notify เรียบร้อยแล้ว
          </strong>
          <br></br>
          <strong>{room}</strong>
        </div>
      </header>
    </div>
  );
}
