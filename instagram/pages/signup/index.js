import Image from "next/image";

import logo from "../../assets/logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { height } from "@mui/system";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Route } from "@mui/icons-material";

function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, user } = useContext(AuthContext);

  let handleClick = async () => {
    console.log(email);
    console.log(password);
    console.log(fullName);
    console.log(file);

    try {
      setLoading(true);
      setError("");
      let userInfo = await signup(email, password);
      console.log(userInfo);
      console.log("User signup");
      // router.push("/");
    } catch (err) {
      console.log("err", JSON.stringify(err));
      setError(err.code);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
  };
  return (
    <div className="signup-container">
      {/* Logo */}
      <div className="signup-card">
        <Image style={{ width: "10rem", height: "3rem" }} src={logo} />
        <p className="txt">
          Sign up to see photos and videos from your friends.
        </p>
        {/* input */}
        <TextField
          id="outlined-basic"
          fullWidth
          label="Email"
          variant="outlined"
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          type="password"
          fullWidth
          label="Password"
          variant="outlined"
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="dense"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* account */}
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          component="label"
        >
          <CloudUploadIcon />
          Upload Profile Image.
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>

        <Button
          style={{ marginTop: "1rem" }}
          variant="contained"
          fullWidth
          onClick={handleClick}
        >
          signup
        </Button>
        {error != "" && <div style={{ color: "red" }}>{error}</div>}
        <div className="tnc">
          By signing up, you agree to our Terms , Privacy Policy and{" "}
          <strong>Cookies Policy.</strong>
        </div>
      </div>
      <div className="bottom-card">
        Already Have an account ?{" "}
        <span style={{ color: "blue", cursor: "pointer" }}>
          <Link href="/login">Login</Link>
        </span>{" "}
      </div>
    </div>
  );
}

export default index;
