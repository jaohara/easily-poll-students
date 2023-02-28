/* eslint-disable */

import { API } from '@aws-amplify/api'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
// import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
// import exports from '../../../aws-exports'
import * as queries from '../../../graphql/queries'
import * as mutations from '../../../graphql/mutations'

const Home = () => {
  // const Auth = useContext(AuthContext)

  return (
    <div>
      This is the homepage. Navigate to sub pages with the buttons above.
      <br />
      <Button onClick={() => invokeLambda()}>guest register lambda test</Button>
      <Button onClick={() => testGraphql()}>test graph ql</Button>
      <Button onClick={() => createUser()}>create user</Button>
    </div>
  )
}

const createUser = async () => {
  await API.graphql({
    query: mutations.createUser,
    variables: {
      input: {
        id: 0,
        email: 'test@test.test',
        firstName: 'Test',
        lastName: 'Test',
      },
    },
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

const testGraphql = async () => {
  const allUsers = await API.graphql({
    query: queries.listUsers,
  })
  console.log(allUsers)
}

const invokeLambda = async () => {
  const myInit = {
    headers: {},
    response: true,
    queryStringParameters: {
      // name: 'param',
    },
  }
  await API.get('guest', '/guest', myInit)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default Home
