import React, { createContext, useState } from "react";
import { Auth } from "aws-amplify";

const AuthContext = createContext(undefined);

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");

  const login = (email, pwd) => {
    Auth.signIn(email, pwd)
      .then((res) => {
        setUser(res);
        setErr("");
      })
      .catch((err) => {
        setErr(err);
      });
  };

  const register = (email, pwd) => {
    Auth.signUp({
      username: email,
      password: pwd,
      attributes: {
        email,
      },
      autoSignIn: {
        enabled: true,
      },
    })
      .then((res) => {
        setUser(res);
        setErr("");
      })
      .catch((err) => {
        setErr(err);
      });
  };

  const logout = () => {
    Auth.signOut()
      .then(() => {
        setUser(null);
        setErr("");
      })
      .catch((err) => {
        setErr(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        err,
        login,
        register,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
