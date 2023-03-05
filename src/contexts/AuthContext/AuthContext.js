import React, { createContext, useState } from 'react'
import { API } from 'aws-amplify'
import { Auth } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import { useNavigate } from 'react-router'

const AuthContext = createContext(undefined)

function AuthContextProvider(props) {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [err, setErr] = useState('')
  const [verifyEmail, setVerifyEmail] = useState('')

  const register = async (email, pwd, firstName, lastName) => {
    await Auth.signUp({
      username: email,
      password: pwd,
      attributes: {
        email,
      },
      autoSignIn: {
        enabled: true,
      },
    })
      .then(async (res) => {
        console.log(res)
        console.log(res.userSub)
        await API.graphql({
          query: mutations.createUser,
          variables: {
            input: {
              id: res.userSub,
              firstName,
              lastName,
              email,
            },
          },
        })
          .then(() => {
            setVerifyEmail(email)
            navigate('/verify')
          })
          .catch(async (err) => {
            console.log('Failed to upload user data to DynamoDB')
            console.log(err)
            await Auth.deleteUser().catch((err) => {
              setErr('Unexpected behavior: contact help center')
              console.log(err)
              // TODO: UI explanations
            })
          })
      })
      .catch((err) => {
        console.log('Failed to create a new user with cognito')
        console.log(err)
        // TODO: UI explanations
      })
  }

  const verify = async (email, code) => {
    await Auth.confirmSignUp(email, code)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        // TODO: UI explanations
      })
  }

  const login = (email, pwd) => {
    Auth.signIn(email, pwd)
      .then(async (res) => {
        await API.graphql({
          query: queries.getUser,
          variables: {
            id: res.username,
          },
        })
          .then((res) => {
            setUser(res.data.getUser)
            navigate('/')
          })
          .catch((err) => {
            // TODO: explanations
            console.log(err)
            Auth.signOut()
          })
      })
      .catch((err) => {
        // TODO: explanations
        console.log(err)
        setErr('error')
      })
  }

  const logout = () => {
    Auth.signOut()
      .then(() => {
        setUser(null)
        setErr('')
      })
      .catch((err) => {
        setErr(err)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        err,
        verifyEmail,
        setVerifyEmail,
        login,
        register,
        verify,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
