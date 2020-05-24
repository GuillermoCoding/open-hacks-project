import React, { useState, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import { useHistory } from "react-router-dom";

export default function Blog() {
  const [user, setUser]= useState(null);
  const history = useHistory();

  useEffect(() => {
    async function getAuthUser() {
      firebase.auth().onAuthStateChanged((user)=>{
        console.log(user)
        if (user) {
          setUser(user);
        } else {
          history.push("/");
        }
      });
    }
    getAuthUser();
  }, [])

  if (user) {
    return (
      <div>
        <h1>BLOG</h1>
        <p>LOGGED IN AS: {user.email}</p>
      </div>
    );
  } else {
    return (
      <p>Loading....</p>
    );
  }
}

