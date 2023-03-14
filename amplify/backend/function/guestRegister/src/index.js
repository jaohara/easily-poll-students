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

const GRAPHQL_ENDPOINT =
  process.env.API_EASILYPOLLSTUDENTS_GRAPHQLAPIENDPOINTOUTPUT
const AWS_REGION = process.env.AWS_REGION || 'us-east-1'
const { Sha256 } = crypto

const query = /* GraphQL */ `
  mutation CreateGuest(
    $input: CreateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    createGuest(input: $input, condition: $condition) {
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const user = JSON.parse(event.body)

  const variables = {
    input: {
      canVote: true,
      id: user.id,
      pollGuestsId: user.pollId,
      name: user.name,
      key: user.key,
    },
  }

  const endpoint = new URL(GRAPHQL_ENDPOINT)

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256,
  })

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  })

  const signed = await signer.sign(requestToBeSigned)
  const request = new Request(endpoint, signed)

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
