import { API } from '@aws-amplify/api'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'

const Home = () => {
  const Auth = useContext(AuthContext)

  console.log(Auth.user)

  return (
    <div>
      This is the homepage. Navigate to sub pages with the buttons above.
      <br />
      <Button onClick={() => invokeLambda()}>guest register lambda test</Button>
    </div>
  )
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
