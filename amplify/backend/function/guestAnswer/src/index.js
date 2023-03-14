/* Amplify Params - DO NOT EDIT
	API_EASILYPOLLSTUDENTS_GRAPHQLAPIENDPOINTOUTPUT
	API_EASILYPOLLSTUDENTS_GRAPHQLAPIIDOUTPUT
	API_EASILYPOLLSTUDENTS_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js'
import { defaultProvider } from '@aws-sdk/credential-provider-node'
import { SignatureV4 } from '@aws-sdk/signature-v4'
import { HttpRequest } from '@aws-sdk/protocol-http'
import { default as fetch, Request } from 'node-fetch'
import sha256 from 'sha256'

const GRAPHQL_ENDPOINT =
  process.env.API_EASILYPOLLSTUDENTS_GRAPHQLAPIENDPOINTOUTPUT
const AWS_REGION = process.env.AWS_REGION || 'us-east-1'
const { Sha256 } = crypto

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const data = JSON.parse(event.body)

  const endpoint = new URL(GRAPHQL_ENDPOINT)

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256,
  })

  // Make sure guest is authorized to make changes
  // Get key from DynamoDB
  // Hash verify token and compare them
  // Make sure the guest can vote
  let requestToBeSigned
  requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query: getGuest, variables: { id: data.id } }),
    path: endpoint.pathname,
  })

  let signed
  let request
  signed = await signer.sign(requestToBeSigned)
  request = new Request(endpoint, signed)

  let statusCode = 200
  let body
  let response

  try {
    response = await fetch(request)
    body = await response.json()
    if (body.errors) statusCode = 400
  } catch (error) {
    statusCode = 500
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    }
  }

  if (body) {
    if (body.data) {
      if (body.data.getGuest) {
        if (!body.data.getGuest.canVote) {
          statusCode = 401
          body = {
            errors: [
              {
                message: 'Guest is not authorized to vote',
              },
            ],
          }
        }
        if (sha256(body.data.getGuest.key + data.timeStamp) != data.verify) {
          statusCode = 401
          body = {
            errors: [
              {
                message: 'Wrong authentication information',
              },
            ],
          }
        }
      }
    }
  }

  // Return unsuccessful request
  if (statusCode != 200) {
    return {
      statusCode,
      //  Uncomment below to enable CORS requests
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(body),
    }
  }

  // Check that answer exists
  requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query: listAnswers,
      variables: {
        filter: {
          and: [
            {
              guestAnswersId: {
                eq: data.id,
              },
            },
            {
              questionAnswersId: {
                eq: data.questionId,
              },
            },
          ],
        },
      },
    }),
    path: endpoint.pathname,
  })

  signed = await signer.sign(requestToBeSigned)
  request = new Request(endpoint, signed)

  try {
    response = await fetch(request)
    body = await response.json()
    if (body.errors) statusCode = 400
  } catch (error) {
    statusCode = 500
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    }
  }

  if (body.data.listAnswers.items.length == 0) {
    // The answer for the user doesn't exist yet, create it
    requestToBeSigned = new HttpRequest({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        host: endpoint.host,
      },
      hostname: endpoint.host,
      body: JSON.stringify({
        query: createAnswer,
        variables: {
          input: {
            questionAnswersId: data.questionId,
            guestAnswersId: data.id,
            answer: data.answer,
          },
        },
      }),
      path: endpoint.pathname,
    })
    signed = await signer.sign(requestToBeSigned)
    request = new Request(endpoint, signed)

    try {
      response = await fetch(request)
      body = await response.json()
      if (body.errors) statusCode = 400
    } catch (error) {
      statusCode = 500
      body = {
        errors: [
          {
            message: error.message,
          },
        ],
      }
    }
  } else {
    // The answer for the user exists update it
    requestToBeSigned = new HttpRequest({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        host: endpoint.host,
      },
      hostname: endpoint.host,
      body: JSON.stringify({
        query: updateAnswer,
        variables: {
          input: {
            id: body.data.listAnswers.items[0].id,
            questionAnswersId: data.questionId,
            guestAnswersId: data.id,
            answer: data.answer,
          },
        },
      }),
      path: endpoint.pathname,
    })
    signed = await signer.sign(requestToBeSigned)
    request = new Request(endpoint, signed)

    try {
      response = await fetch(request)
      body = await response.json()
      if (body.errors) statusCode = 400
    } catch (error) {
      statusCode = 500
      body = {
        errors: [
          {
            message: error.message,
          },
        ],
      }
    }
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(body),
  }
}

const getGuest = /* GraphQL */ `
  query GetGuest($id: ID!) {
    getGuest(id: $id) {
      poll {
        id
        title
        isActive
        isLocked
        roomSize
        createdAt
        updatedAt
        userPollsId
      }
      canVote
      answers {
        nextToken
      }
      id
      name
      key
      createdAt
      updatedAt
      pollGuestsId
    }
  }
`

const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        answer
        id
        createdAt
        updatedAt
        questionAnswersId
        guestAnswersId
      }
      nextToken
    }
  }
`

const createAnswer = /* GraphQL */ `
  mutation CreateAnswer(
    $input: CreateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    createAnswer(input: $input, condition: $condition) {
      question {
        id
        prompt
        answerOptions
        questionType
        createdAt
        updatedAt
        pollQuestionsId
      }
      owner {
        canVote
        id
        name
        key
        createdAt
        updatedAt
        pollGuestsId
      }
      answer
      id
      createdAt
      updatedAt
      questionAnswersId
      guestAnswersId
    }
  }
`

const updateAnswer = /* GraphQL */ `
  mutation UpdateAnswer(
    $input: UpdateAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    updateAnswer(input: $input, condition: $condition) {
      question {
        id
        prompt
        answerOptions
        questionType
        createdAt
        updatedAt
        pollQuestionsId
      }
      owner {
        canVote
        id
        name
        key
        createdAt
        updatedAt
        pollGuestsId
      }
      answer
      id
      createdAt
      updatedAt
      questionAnswersId
      guestAnswersId
    }
  }
`
