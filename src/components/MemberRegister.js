import React, { useState } from "react";
import "../App.css";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Alert } from "@material-ui/lab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import axios from "axios";

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

export default function MemberRegister() {
  const classes = useStyles();

  const [memberName, setMemberName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [alert, setAlert] = useState(false);

  // const handleChangeSelectMemberName = (e) => {
  //   setMemberName(e.target.value);
  // };

  // const getMemberName = () => {
  //   axios.get("http://localhost:5000/memberinfo").then((result) => {
  //     console.log(result.data);
  //     setListMember(result.data);
  //   });
  // };

  const handleSubmit = () => {
    if (memberName !== "") {
      console.log(memberName, phone, email);

      localStorage.setItem("MEMBERNAME", memberName);
      localStorage.setItem("PHONE", phone);
      localStorage.setItem("EMAIL", email);
  
      // console.log(
      //   localStorage.getItem("MEMBERNAME"),
      //   localStorage.getItem("PHONE"),
      //   localStorage.getItem("EMAIL")
      // );

      MemberAuth();
    } else {
      setAlert(true);
    }
  };

  // useEffect(() => {
  //   console.log(memberName, phone, email);
  // });

  return (
    <div className="App">
      <div className="App-header">
        {alert ? (
          <Alert severity="error">
            <strong>กรุณากรอกข้อมูลให้ครบถ้วน</strong>
          </Alert>
        ) : null}

        <h1>สมาชิกลงทะเบียนระบบแจ้งเตือนผ่าน Line</h1>
      </div>

      <div className="App-body">
        <form className={classes.root} autoComplete="off">
          <strong>1. กรอกข้อมูลชื่อ</strong>
          <CssTextField
            required
            label="Name"
            variant="outlined"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <br></br>
          <strong>2. กรอกข้อมูล email</strong>
          <CssTextField
            required
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <strong>3. กรอกข้อมูลเบอร์โทรศัพท์</strong>
          <CssTextField
            required
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br></br>
        </form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          ยืนยัน
        </Button>
      </div>
    </div>
  );
}

function MemberAuth() {
  var URL = "https://notify-bot.line.me/oauth/authorize?";
  URL += "response_type=code";
  URL += `&client_id=F2PXAs5Cis62mqbyRG1cD8`;
  URL += "&redirect_uri=http://localhost:3000/member-callback"; //ถ้า login แล้ว เลือกกลุ่มหรือตัวเอง ให้กลับมาหน้านี้
  URL += "&scope=notify";
  URL += "&state=choteseeworld@gmail.com"; //กำหนด  user หรือ อะไรก็ได้ที่สามารถบอกถึงว่าเป็น user ในระบบ
  window.location.href = URL;
}
