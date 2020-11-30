import React, { useState, useEffect } from "react";
import "../App.css";

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

export default function MemberCallback() {
  const classes = useStyles();

  const [memberName, setMemberName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [code, setCode] = useState("");

  function getToken() {
    axios
      .post(
        "http://localhost:5000/code2",
        querystring.stringify({
          code: code,
          memberName: memberName,
          phone: phone,
          email: email,
        }),
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  async function getParamiter() {
    const urlParams = await new URLSearchParams(window.location.search);
    const myParam = urlParams.get("code");

    setMemberName(localStorage.getItem("MEMBERNAME"));
    setPhone(localStorage.getItem("PHONE"));
    setEmail(localStorage.getItem("EMAIL"));

    setCode(myParam);
  }

  // useEffect(() => {
  //   // console.log("Do in use effect!!!");
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const myParam = urlParams.get("code");

  //   setGroupName(localStorage.getItem(GROUPNAME));
  //   setCompanyName(localStorage.getItem(COMPANYNAME));
  //   setCode(myParam);

  //   if (myParam !== "") {
  //     getToken();
  //   }

  //   // return () => {
  //   //   localStorage.clear();
  //   // };
  // }, []);

  useEffect(() => {

    let mounted = true;

    getParamiter().then(() => {
      if (mounted) {
        getToken();
      }
    });
    return () => (mounted = false);
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <strong>
            ท่านได้ทำการลงทะเบียนไลน์ การแจ้งเตือนผ่าน Line Notify เรียบร้อยแล้ว
          </strong>
          <br></br>
          <strong>
            {memberName} {phone} {email}
          </strong>
        </div>
      </header>
    </div>
  );
}
