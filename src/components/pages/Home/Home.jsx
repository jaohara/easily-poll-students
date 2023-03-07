import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'

const Home = () => {
  const Auth = useContext(AuthContext)

  return (
    <div>
      This is the homepage. Navigate to sub pages with the buttons above. <br />
      User first name: {Auth.user
        ? Auth.user.firstName
        : 'unauthenticated'}{' '}
      <br />
      <Button onClick={() => Auth.logout()}>Logout</Button>
    </div>
  )
}

export default Home
