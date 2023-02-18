import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

const Home = () => {
  const Auth = useContext(AuthContext);

  console.log(Auth.user);

  return (
    <div>
      This is the homepage. Navigate to sub pages with the buttons above.
    </div>
  );
};

export default Home;
