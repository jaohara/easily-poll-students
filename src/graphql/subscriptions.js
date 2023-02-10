/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion(
    $id: ID
    $prompt: String
    $answer_options: String
    $answers: AWSJSON
    $is_active: Boolean
  ) {
    onCreateQuestion(
      id: $id
      prompt: $prompt
      answer_options: $answer_options
      answers: $answers
      is_active: $is_active
    ) {
      id
      prompt
      answer_options
      answers
      is_active
      answer_type
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion(
    $id: ID
    $prompt: String
    $answer_options: String
    $answers: AWSJSON
    $is_active: Boolean
  ) {
    onUpdateQuestion(
      id: $id
      prompt: $prompt
      answer_options: $answer_options
      answers: $answers
      is_active: $is_active
    ) {
      id
      prompt
      answer_options
      answers
      is_active
      answer_type
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion(
    $id: ID
    $prompt: String
    $answer_options: String
    $answers: AWSJSON
    $is_active: Boolean
  ) {
    onDeleteQuestion(
      id: $id
      prompt: $prompt
      answer_options: $answer_options
      answers: $answers
      is_active: $is_active
    ) {
      id
      prompt
      answer_options
      answers
      is_active
      answer_type
    }
  }
`;
