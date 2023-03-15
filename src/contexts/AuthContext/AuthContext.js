/*eslint-disable */
import React, { 
  createContext, 
  useEffect,
  useRef, 
  useState, 
} from 'react'
import { API, Hub } from 'aws-amplify'
import { Auth } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import { useNavigate } from 'react-router'

const AuthContext = createContext(undefined)

function AuthContextProvider(props) {
  // prevents bug where you need to press logout button twice
  // const isLoggingOut = useRef(false);

  const navigate = useNavigate();

  const parseSessionUser = () => {
    try {
      const currentUser = JSON.parse(window.sessionStorage.getItem("currentUser"));
      return currentUser;
    }
    catch(e) {
      return null;
    }
  };

  const saveSessionUser = (userObject) => {
    if (!userObject) {
      return;
    }

    const stringifiedUser = JSON.stringify(userObject)
    window.sessionStorage.setItem("currentUser", stringifiedUser);
  }

  const [user, setUser] = useState(parseSessionUser())
  // const [userIsLoading, setUserIsLoading] = useState(true);
  const [userCognito, setUserCognito] = useState(null)
  const [registerUserData, setRegisterUserData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log("In AuthContext initial page load:")
    console.log("storageSession currentUser: ", window.sessionStorage.getItem("currentUser"));
    console.log("user:", user);
    console.log("userCognito: ", userCognito);
    console.log("Auth.currentAuthenticatedUser(): ", Auth.currentAuthenticatedUser());
  }, [])

  // useEffect(() => {
  //   if (!user && window.sessionStorage.getItem("currentUser")) {
  //     console.log("In that useEffect that resets the login")
  //     Auth.currentAuthenticatedUser().then((res) => {
  //       API.graphql({
  //         query: queries.getUser,
  //         variables: {
  //           id: res.username,
  //         },
  //       })
  //         .then((res) => {
  //           setUser(res.data.getUser)
  //         })
  //         .catch(() => {
  //           // TODO: finish register (enter first name, last name)
  //         })
  //     })
  //   }
  // })

  // // resets isLoggingOut ref
  // useEffect(() => {
  //   if (!user) {
  //     isLoggingOut.current = false;
  //   }
  // }, [user])

  const register = (email, password, firstName, lastName) => {
    setRegisterUserData({ email, firstName, lastName })
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
      autoSignIn: {
        enabled: true,
      },
    })
      .then((res) => {
        setRegisterUserData((old) => ({ ...old, id: res.userSub }))
        navigate('/verify')
      })
      .catch((err) => {
        console.log(err)
        // TODO: UI
      })
  }

  const login = (email, password, from = null) => {
    const destinationRoute = from ? from : "/";

    Auth.signIn(email, password)
      .then((res) => {
        setUserCognito(res)
        API.graphql({
          query: queries.getUser,
          variables: {
            id: res.username,
          },
        })
          .then((res) => {
            console.log("setting session storage to res.data.getUser:", res.data.getUser);
            // const stringifiedUser = JSON.stringify(res.data.getUser)
            // window.sessionStorage.setItem("currentUser", stringifiedUser);
            saveSessionUser(res.data.getUser);
            setUser(res.data.getUser)
            navigate(destinationRoute);
          })
          .catch((err) => {
            console.log(err)
            navigate('/register')
          })
      })
      .catch((err) => {
        console.log(err)
        // TODO: UI
      })
  }

  const verify = (email, code) => {
    Auth.confirmSignUp(email, code)
      .then((res) => {
        if (registerUserData) {
          API.graphql({
            query: mutations.createUser,
            variables: {
              input: {
                ...registerUserData,
              },
            },
          })
            .then((res) => {
              setUser(res.data.createUser)
              navigate('/')
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          navigate('/register-step')
        }
      })
      .catch((err) => {
        console.log(err)
        setError('')
        // TODO: UI explanations
      })
  }

  const logout = () => {
    // isLoggingOut.current = true;
    window.sessionStorage.setItem("currentUser", null);
    Auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        error,
        login,
        logout,
        register,
        registerUserData,
        user,
        userCognito,
        verify,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
