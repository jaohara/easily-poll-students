/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      prompt
      answer_options
      answers
      is_active
      answer_type
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      id
      prompt
      answer_options
      answers
      is_active
      answer_type
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion($input: DeleteQuestionInput!) {
    deleteQuestion(input: $input) {
      id
      prompt
      answer_options
      answers
      is_active
      answer_type
    }
  }
`;
