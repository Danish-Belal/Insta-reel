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
import { getStorage,getDownloadURL, ref, uploadBytesResumable  } from "firebase/storage";
import { storage, Storage } from "../../firebase";

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
      console.log(JSON.stringify(userInfo));
      // console.log("User signup");
      // router.push("/");

        // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage , `${userInfo.user.uid}/Profile`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          // switch (error.code) {
          //   case "storage/unauthorized":
          //     // User doesn't have permission to access the object
          //     break;
          //   case "storage/canceled":
          //     // User canceled the upload
          //     break;

          //   // ...

          //   case "storage/unknown":
          //     // Unknown error occurred, inspect error.serverResponse
          //     break;
          // }
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
      console.log("User Signed in")
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
