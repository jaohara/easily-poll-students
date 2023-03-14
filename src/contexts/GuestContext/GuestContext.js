/* eslint-disable */
import React, { createContext, useEffect, useState } from 'react'
import sha256 from 'sha256'
import { API } from 'aws-amplify'
import * as queries from '../../graphql/queries'
import {
  onUpdatePoll,
  onUpdateAnswer,
  onCreateAnswerForQuestion,
  onUpdateAnswerForQuestion,
  onUpdateQuestion,
} from '../../graphql/subscriptions'

const GuestContext = createContext(undefined)

const GuestContextProvider = (props) => {
  // User
  const [name, setName] = useState(window.sessionStorage.getItem('name'))
  const [key, setKey] = useState(window.sessionStorage.getItem('key'))
  const [id, setId] = useState(window.sessionStorage.getItem('id'))
  // Polls
  const [pollId, setPollId] = useState(window.sessionStorage.getItem('pollId'))
  const [loadedPollId, setLoadedPollId] = useState('')
  const [pollData, setPollData] = useState({})
  const [pollSubscription, setPollSubscription] = useState(undefined)
  // Questions
  const [questions, setQuestions] = useState([])
  const [currentQuestionId, setCurrentQuestionId] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState({})
  const [questionSubscription, setQuestionSubscription] = useState(undefined)
  // Answers
  const [answers, setAnswers] = useState([])
  const [answerCreateSubscription, setAnswerCreateSubscription] =
    useState(undefined)
  const [answerUpdateSubscription, setAnswerUpdateSubscription] =
    useState(undefined)

  // poll id changes, load and subscribe to the new poll data
  useEffect(() => {
    if (pollId === '') {
      if (pollSubscription) {
        pollSubscription()
      }
    } else if (pollId !== loadedPollId || Object.keys(pollData).length === 0) {
      setLoadedPollId(pollId)
      API.graphql({
        query: getPollWithQuestions,
        variables: {
          id: pollId,
        },
      })
        .then((res) => {
          setPollData(res.data.getPoll)
          setQuestions(res.data.getPoll.questions.items)
          setCurrentQuestionId(res.data.getPoll.questions.items[0].id)
        })
        .catch((err) => {
          console.warn(err)
        })
      const subscriptionTemp = API.graphql({
        query: onUpdatePoll,
        variables: {
          id: pollId,
        },
      }).subscribe({
        next: (res) => {
          setPollData(res.value.data.onUpdatePoll)
        },
        error: (err) => console.warn(err),
      })
      setPollSubscription(subscriptionTemp)
    }
  }, [pollId])

  // current question changes, load and subscribe to the new question data
  useEffect(() => {
    typeof questionSubscription === 'function' ? questionSubscription() : null
    typeof answerCreateSubscription === 'function'
      ? answerCreateSubscription()
      : null
    typeof answerUpdateSubscription === 'function'
      ? answerUpdateSubscription()
      : null
    if (currentQuestionId !== '') {
      API.graphql({
        query: getQuestionWithAnswers,
        variables: {
          id: currentQuestionId,
        },
      }).then((res) => {
        setCurrentQuestion(res.data.getQuestion)
        setAnswers(res.data.getQuestion.answers.items)
      })
      setQuestionSubscription(
        API.graphql({
          query: onUpdateQuestion,
          variables: {
            id: currentQuestionId,
          },
        }).subscribe({
          next: (res) => {
            setCurrentQuestion(res.value.data.onUpdateQuestion)
          },
          error: (err) => console.warn(err),
        })
      )
      setAnswerCreateSubscription(
        API.graphql({
          query: onCreateAnswerForQuestion,
          variables: {
            questionAnswersId: currentQuestionId,
          },
        }).subscribe({
          next: (res) => {
            setAnswers((oldAnswers) => [
              ...oldAnswers,
              res.value.data.onCreateAnswerForQuestion,
            ])
          },
          error: (err) => console.warn(err),
        })
      )
      setAnswerUpdateSubscription(
        API.graphql({
          query: onUpdateAnswerForQuestion,
          variables: {
            questionAnswersId: currentQuestionId,
          },
        }).subscribe({
          next: (res) => {
            const updatedAnswer = res.value.data.onUpdateAnswerForQuestion
            setAnswers((oldAnswers) =>
              oldAnswers.map((answer) =>
                answer.id === updatedAnswer.id ? updatedAnswer : answer
              )
            )
          },
          error: (err) => console.warn(err),
        })
      )
    }
  }, [currentQuestionId])

  const register = (name, pollId) => {
    setPollId(pollId)
    setName(name)
    const key = sha256(name + Date.now())
    setKey(key)
    const id = sha256(key)
    setId(id)
    window.sessionStorage.setItem('pollId', pollId)
    window.sessionStorage.setItem('name', name)
    window.sessionStorage.setItem('key', key)
    window.sessionStorage.setItem('id', id)
    const init = {
      body: {
        pollId,
        name,
        key,
        id,
      },
      headers: {},
    }
    API.post('guest', '/guest', init)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const submitAnswer = (answer) => {
    const timeStamp = Date.now()
    const init = {
      body: {
        id,
        questionId: currentQuestionId,
        verify: sha256(key + timeStamp),
        timeStamp,
        answer,
      },
      headers: {},
    }

    API.post('guest', '/answer', init)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <GuestContext.Provider
      value={{
        name,
        id,
        pollId,
        pollData,
        questions,
        currentQuestion,
        answers,
        register,
        submitAnswer,
      }}
    >
      {props.children}
    </GuestContext.Provider>
  )
}

export { GuestContext, GuestContextProvider }

const getPollWithQuestions = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
      user {
        id
        email
        firstName
        lastName
        createdAt
        updatedAt
      }
      questions {
        nextToken
        items {
          id
          prompt
          answerOptions
          questionType
          createdAt
          updatedAt
          pollQuestionsId
        }
      }
      id
      title
      isActive
      isLocked
      roomSize
      createdAt
      updatedAt
      userPollsId
      # pollLinkNameId
    }
  }
`

const getQuestionWithAnswers = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      answers {
        nextToken
        items {
          answer
          id
          createdAt
          updatedAt
          questionAnswersId
          guestAnswersId
        }
      }
      id
      prompt
      answerOptions
      questionType
      createdAt
      updatedAt
      pollQuestionsId
    }
  }
`
