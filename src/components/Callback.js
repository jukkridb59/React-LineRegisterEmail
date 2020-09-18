import React, { useState, useEffect } from "react";
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

  const getToken = () => {
    axios
      .post(
        "http://localhost:5000/code",
        querystring.stringify({
          code: code,
          groupName: groupName,
          companyName: companyName,
        }),
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      )
      .then(() => {
        // console.log("response: ", response);

        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log("Do in use effect!!!");
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("code");

    setGroupName(localStorage.getItem(GROUPNAME));
    setCompanyName(localStorage.getItem(COMPANYNAME));
    setCode(myParam);

    if (myParam !== "") {
      getToken();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <strong>
            ท่านได้ทำการลงทะเบียนไลน์ การแจ้งเตือนผ่าน Line Notify เรียบร้อยแล้ว
          </strong>
          <strong>
            ท่านได้ทำการลงทะเบียนไลน์ การแจ้งเตือนผ่าน Line Notify เรียบร้อยแล้ว
          </strong>
          <br></br>
          <strong>
            {groupName} {companyName}
          </strong>

          <strong></strong>
        </div>
      </header>
    </div>
  );
}
