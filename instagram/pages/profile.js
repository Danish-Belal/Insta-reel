import React, { useContext } from "react";
import { useRouter } from "next/router";
import Profile from "../components/Profile";
import { AuthContext } from "../context/auth";

export default function profile() {
  const { user } = useContext(AuthContext);

  const Redirect = () => {
    const router = useRouter();
    router.push("/login");
  };

  return <>{user?.uid ? <Profile /> : <Redirect />}</>;
}
