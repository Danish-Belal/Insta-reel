import React from "react";
import NavBar from "./NavBar";
import Image from "next/image";
import user from "../assets/profile-avt.png";
export default function Profile() {
  return (
    <div>
      <NavBar />
      <div>
        <div className="profile-intro">
          <div style={{hight:"8rem" , width:"8rem" , borderRadius:"50%"}}>
            <Image src={user} />
          </div>
          <div>
          <h1>Danish</h1>
          <h1>Post:300</h1>
          </div>
        </div>
        <div className="profile-posts">
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
          <video src=""></video>
        </div>
      </div>
    </div>
  );
}
