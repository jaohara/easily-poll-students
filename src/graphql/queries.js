/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getColorSwatch = /* GraphQL */ `
  query GetColorSwatch($id: ID!) {
    getColorSwatch(id: $id) {
      id
      color
      createdAt
      updatedAt
    }
  }
`;
export const listColorSwatches = /* GraphQL */ `
  query ListColorSwatches(
    $filter: ModelColorSwatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listColorSwatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        color
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      questions {
        items {
          id
          prompt
          createdAt
          updatedAt
          sessionQuestionsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        questions {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      prompt
      createdAt
      updatedAt
      sessionQuestionsId
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        prompt
        createdAt
        updatedAt
        sessionQuestionsId
      }
      nextToken
    }
  }
`;
