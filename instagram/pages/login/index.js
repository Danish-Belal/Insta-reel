import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Carousel } from "react-responsive-carousel";

import bg1 from "../../assets/insta-bg1.png";
import bg2 from "../../assets/insta-bg2.png";
import bg3 from "../../assets/insta-bg3.png";

import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { Link } from "@mui/material";

function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoaging] = useState(false);
  const { login, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  let handleClick = async () => {
    try {
      console.log(email);
      console.log(password);
      setLoaging(true);
      setError("");
      await login(email, password);
      console.log("logged in");
      router.push("/login");
    } catch (err) {
      console.log("err", JSON.stringify(err));
      setError(err.code);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoaging(false);
  };

  return (
    <div className="login-container">
      <div className="insta-mob-bg">
        {/* <div className="carosel">
          <Carousel
            autoPlay
            interval={2000}
            infiniteLoop
            showArrows={false}
            showThumbs={false}
            showIndicators={false}
            stopOnHover
            showStatus={false}
          >
            <Image src={bg1} style={{ width: "250px" ,height:"auto" ,position:"absolute"  , left : "450px"  }} />
            <Image src={bg2} style={{ width: "250px", margin: "1rem" }} />
            <Image src={bg3} style={{ width: "250px", margin: "1rem" }} />
          </Carousel>
        </div> */}
      </div>
      <div>
        <div className="login-card">
          <Image style={{ width: "10rem", height: "3rem" }} src={logo} />
          <TextField
            id="outlined-basic"
            fullWidth
            label="Email"
            variant="outlined"
            margin="dense"
            type="text"
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
          {/* if error , then show error */}
          {error != "" && <div style={{ color: "red" }}>{error}</div>}
          <Link href="/forget">
            <div style={{ color: "blue", marginTop: "1rem" }}>
              Forget Password
            </div>
          </Link>
          <Button
            style={{ marginTop: "1rem" }}
            variant="contained"
            fullWidth
            onClick={handleClick}
          >
            Log in
          </Button>
        </div>
        <div className="bottom-card">
          Don't have an account?{" "}
          <Link href = "/signup">
          <span style={{ color: "blueviolet", cursor: "pointer" }} >
            Sign up
          </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
