import React, { useState } from "react";
import Button from "@mui/material/Button";
import MovieIcon from "@mui/icons-material/Movie";
import LinearProgress from "@mui/material/LinearProgress";
import { Alert } from "@mui/material";
import { storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { uploadBytesResumable } from "firebase/storage";
import { useDeviceLanguage } from "firebase/auth";
import { serverTimestamp , doc , setDoc} from "firebase/firestore";

function Upload({ userData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const fileLimit = 50;
  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file == null) {
      setError("File not Selected");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if ((file.size / 1024) * 1024 > fileLimit) {
      setError(
        `File is Too Large , try uploading a file less than ${fileLimit}MB `
      );
      setTimeout(() => setError(""), 3000);
      return;
    }
    let uid = uuidv4();
    setLoading(true);

    const storageref = ref(storage, `${userData.uid}/post/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const prog =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + prog + "% done");
      setProgress(prog)
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
      console.log(error);

        setError(err.code);
        setTimeout(() => {
          setError("");
        }, 2000);
        return ;
      
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        console.log("File available at", downloadURL);
        let postDate = {
          likes : [] , 
          postIs  : uid,
          postURL : downloadURL,
          profileName : userData.name,
          profilePhotoURL: userData.profilePhoto,
          userId : userData.uid,
          timestamp : serverTimestamp()
        }
        console.log("postData", postDate);
        await setDoc(doc(db,"posts" , uid),postDate);
        console.log("post added to posts collection");
      });
    }
  );
  }
  return (
    <div className="upload-btn">
      {error != "" ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          component="label"
          size="large"
        >
          <MovieIcon />
          Upload Media
          <input
            hidden
            accept="*"
            multiple
            type="file"
            onChange={handleChange}
          />
        </Button>
      )}
      {loading && (
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress}
          sx={{ mt: "0.5rem", mb: "0.5rem" }}
        />
      )}
    </div>
  );
}

export default Upload;
