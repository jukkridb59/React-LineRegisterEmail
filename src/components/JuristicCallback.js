import React, { useState, useEffect } from "react";

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

export default function JuristicCallback() {
  const classes = useStyles();

  const [emailLine, setEmailLine] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const [lineGroupId, setLineGroupId] = useState("");
  const [lineGroupName, setLineGroupName] = useState("");
  const [remarks, setRemarks] = useState("");

  const [code, setCode] = useState("");

  function getToken() {
    axios
      .post(
        "http://localhost:5000/code",
        querystring.stringify({
          code: code,
          lineGroupId: lineGroupId,
          lineGroupName: lineGroupName,
          remarks: remarks,
        }),
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  async function getParamiter() {
    const urlParams = await new URLSearchParams(window.location.search);
    const myParam = urlParams.get("code");

    setGroupName(localStorage.getItem("GROUPNAME"));
    setCompanyName(localStorage.getItem("COMPANYNAME"));

    setCode(myParam);
  }

  useEffect(() => { 
    let mounted = true;
    getParamiter().then(() => {
      if (mounted) {
        getToken();
      }
    });

    return () => (
      mounted = false
      // localStorage.clear()
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <h3>
            ท่านได้ทำการลงทะเบียนไลน์ การแจ้งเตือนผ่าน Line Notify เรียบร้อยแล้ว
          </h3>
          <br></br>
          <h4>
            Group name: {groupName}, Company name: {companyName}
          </h4>
        </div>
      </header>
    </div>
  );
}
