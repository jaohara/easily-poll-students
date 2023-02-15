import React, { useState } from "react";
import { Auth } from "aws-amplify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <textarea value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea value={pwd} onChange={(e) => setPwd(e.target.value)} />
      <button
        onClick={() => {
          signIn(email, pwd);
        }}
      >
        login
      </button>
    </div>
  );
}

async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    console.log(user);
  } catch (error) {
    console.log("error signing in", error);
  }
}
