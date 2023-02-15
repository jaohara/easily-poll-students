import React, { useState } from "react";
import { Auth } from "aws-amplify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <textarea value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea value={pwd} onChange={(e) => setPwd(e.target.value)} />
      <button
        onClick={() => {
          signUp(email, pwd);
        }}
      >
        register
      </button>
    </div>
  );
}

async function signUp(username, password) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email: username, // optional
        // other custom attributes
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
}
