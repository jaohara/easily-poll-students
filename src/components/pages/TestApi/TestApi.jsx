import React, { useEffect, useState } from "react";
import { API } from "@aws-amplify/api";
import * as queries from "../../../graphql/queries";
import * as mutations from "../../../graphql/mutations";
import { Auth } from "aws-amplify";

export default function TestApi() {
  const [guestOk, setGuestOk] = useState(false);
  const [creatorOk, setCreatorOk] = useState(false);
  const [a, setA] = useState(false);

  useEffect(() => {
    API.graphql({
      query: queries.getQuestion,
      variables: {
        id: 1,
      },
    }).then(() => {
      setGuestOk(true);
    });
    API.graphql({
      query: mutations.updateQuestion,
      variables: {
        input: {
          id: 1,
          prompt: "hello",
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
      .then((res) => {
        setCreatorOk(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        Auth.currentAuthenticatedUser()
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      });
  });

  return (
    <div>
      {guestOk ? <div>guest ok</div> : <div>guest not ok</div>}
      {creatorOk ? <div>creator ok</div> : <div>creator not ok</div>}
      <button
        onClick={() => {
          setA(!a);
        }}
      >
        try again
      </button>
    </div>
  );
}
