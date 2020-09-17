import React, { useState } from "react";
import "../App.css";
import { GROUPNAME, COMPANYNAME } from "../Auth";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#D6E0F0",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#43658B",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#43658B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#43658B",
      },
    },
  },
})(TextField);

export default function Register() {
  const classes = useStyles();

  const [groupName, setGroupName] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [alert, setAlert] = useState(false);

  const handleSubmit = () => {
    if (groupName !== "" && companyName !== "") {
      localStorage.setItem(GROUPNAME, groupName);
      localStorage.setItem(COMPANYNAME, companyName);
      Auth();
    } else {
      setAlert(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {alert ? (
          <Alert severity="error">
            <strong>
              กรุณาใส่ชื่อ Group ใน Line หรือชื่อ Company
              ของท่านที่จะให้แจ้งเตือน
            </strong>
          </Alert>
        ) : null}

        <strong>
          ชื่อ Group ใน Line ของท่านที่จะให้แจ้งเตือนผ่าน Line Notify
        </strong>
        <form className={classes.root} autoComplete="off">
          <CssTextField
            required
            id="outlined-basic"
            label="Group-Name"
            variant="outlined"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <br></br>
          <strong>ชื่อบริษัท</strong>
          <br></br>
          <CssTextField
            required
            id="outlined-basic"
            label="Company-Name"
            variant="outlined"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <br></br>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            ยืนยัน
          </Button>
        </form>
      </header>
    </div>
  );
}

function Auth() {
  var URL = "https://notify-bot.line.me/oauth/authorize?";
  URL += "response_type=code";
  URL += "&client_id=F2PXAs5Cis62mqbyRG1cD8";
  URL += "&redirect_uri=http://localhost:3000/callback"; //ถ้า login แล้ว เลือกกลุ่มหรือตัวเอง ให้กลับมาหน้านี้
  URL += "&scope=notify";
  URL += "&state=choteseeworld@gmail.com"; //กำหนด  user หรือ อะไรก็ได้ที่สามารถบอกถึงว่าเป็น user ในระบบ
  window.location.href = URL;
}
