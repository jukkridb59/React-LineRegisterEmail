import React, { useState, useCallback } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

import { Container, TextField, Button, Paper } from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function JuristicRegister() {
  const classes = useStyles();

  //new state
  const [emailLine, setEmailLine] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const [lineGroupId, setLineGroupId] = useState("");
  const [lineGroupName, setLineGroupName] = useState("");
  const [remarks, setRemarks] = useState("");

  const [alert, setAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(lineGroupId, lineGroupName, remarks, emailLine, clientId);
    if (
      lineGroupId !== "" &&
      lineGroupName !== "" &&
      remarks !== "" &&
      emailLine !== "" &&
      clientId !== "" &&
      clientSecret !== ""
    ) {
      localStorage.setItem("LINEGROUP_ID", lineGroupId);
      localStorage.setItem("LINEGROUP_NAME", lineGroupName);
      localStorage.setItem("REMARKS", remarks);

      localStorage.setItem("EMAIL_LINE", emailLine);
      localStorage.setItem("CLIENT_ID", clientId);
      localStorage.setItem("CLIENT_SECRET", clientSecret);

      // JuristicAuth(emailLine, clientId);
      // testURL(emailLine, clientId);
      handleLineNotifyLogin();
    } else {
      setAlert(true);
    }
  };

  const handleLineNotifyLogin = useCallback(async () => {
    const url = [
      `https://notify-bot.line.me/oauth/authorize?response_type=code`,
      `client_id=${localStorage.getItem("CLIENT_ID")}`,
      `redirect_uri=http://localhost:3000/juristic-callback`,
      `scope=notify`,
      `state=${localStorage.getItem("EMAIL_LINE")}`,
    ].join("&");

    window.location.assign(url);
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: "center", margin: "2rem" }}>
        ลงทะเบียนระบบแจ้งเตือนผ่าน Line
      </h1>

      {alert ? (
        <Alert severity="error">
          <strong>กรุณากรอกข้อมูลให้ครบถ้วนก่อน</strong>{" "}
        </Alert>
      ) : null}

      <div
        style={{
          display: "flex",
          flexDirection: "column ",
          justifyContent: "center",
        }}
      >
        <Paper elevation={5} style={{ width: "100ch", margin: "2rem" }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ margin: "2rem" }}
          >
            <TextField
              id="email-line-id"
              label="Email Line"
              style={{ width: "40ch" }}
              onInput={(e) => setEmailLine(e.target.value)}
            />
            <br></br>
            <TextField
              id="client-id-line-id"
              label="Clinet ID Line"
              style={{ width: "40ch" }}
              onInput={(e) => setClientId(e.target.value)}
            />
            <TextField
              id="client-secret--id"
              label="Client Secret"
              style={{ width: "40ch" }}
              onInput={(e) => setClientSecret(e.target.value)}
            />
            <br></br>
          </form>
        </Paper>

        <Paper elevation={5} style={{ width: "100ch", margin: "2rem" }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ margin: "2rem" }}
          >
            <TextField
              id="lineGroupId-id"
              label="Line Group Id"
              style={{ width: "40ch" }}
              onInput={(e) => setLineGroupId(e.target.value)}
            />
            <br></br>
            <TextField
              id="lineGroupName-id"
              label="Line Group Name"
              style={{ width: "40ch" }}
              onInput={(e) => setLineGroupName(e.target.value)}
            />
            <br></br>

            <TextField
              id="Remarks-id"
              label="Remarks (Description)"
              style={{ width: "60ch" }}
              onInput={(e) => setRemarks(e.target.value)}
            />
            <br></br>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  );
}

// function testURL() {
//   const qParams = [
//     `https://notify-bot.line.me/oauth/authorize?`,
//     `response_type=code`,
//     `client_id=${emailLine}`,
//     `redirect_uri=http://localhost:3000/juristic-callback`,
//     `scope=notify`,
//     `state=${clientId}`,
//   ].join("&");

//   try {
//     const response = await axios.get(`/api/auth-url/google?${qParams}`);
//     const url = await response.text();
//     window.location.assign(url);
//   } catch (e) {
//     console.error(e);
//   }

//   var URL = "https://notify-bot.line.me/oauth/authorize?";
//   URL += "response_type=code";
//   URL += "&client_id=";
//   URL += client_id;
//   URL += "&redirect_uri=http://localhost:3000/juristic-callback"; //ถ้า login แล้ว เลือกกลุ่มหรือตัวเอง ให้กลับมาหน้านี้
//   URL += "&scope=notify";
//   URL += "&state="; //กำหนด  user หรือ อะไรก็ได้ที่สามารถบอกถึงว่าเป็น user ในระบบ
//   URL += email;

//   console.log(URL);
//   window.location.href = URL;
// }

// function JuristicAuth(email, client_id) {
//   var URL = "https://notify-bot.line.me/oauth/authorize?";
//   URL += "response_type=code";
//   URL += "&client_id=F2PXAs5Cis62mqbyRG1cD8";
//   URL += "&redirect_uri=http://localhost:3000/juristic-callback"; //ถ้า login แล้ว เลือกกลุ่มหรือตัวเอง ให้กลับมาหน้านี้
//   URL += "&scope=notify";
//   URL += "&state=choteseeworld@gmail.com"; //กำหนด  user หรือ อะไรก็ได้ที่สามารถบอกถึงว่าเป็น user ในระบบ

//   // console.log(URL);
//   window.location.href = URL;
// }
