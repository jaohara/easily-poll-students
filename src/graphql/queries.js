/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      id
      prompt
      answer_options
      answers
      is_active
      answer_type
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: TableQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        prompt
        answer_options
        answers
        is_active
        answer_type
      }
      nextToken
    }
  }
`;
