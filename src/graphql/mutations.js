/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createColorSwatch = /* GraphQL */ `
  mutation CreateColorSwatch(
    $input: CreateColorSwatchInput!
    $condition: ModelColorSwatchConditionInput
  ) {
    createColorSwatch(input: $input, condition: $condition) {
      id
      color
      createdAt
      updatedAt
    }
  }
`;
export const updateColorSwatch = /* GraphQL */ `
  mutation UpdateColorSwatch(
    $input: UpdateColorSwatchInput!
    $condition: ModelColorSwatchConditionInput
  ) {
    updateColorSwatch(input: $input, condition: $condition) {
      id
      color
      createdAt
      updatedAt
    }
  }
`;
export const deleteColorSwatch = /* GraphQL */ `
  mutation DeleteColorSwatch(
    $input: DeleteColorSwatchInput!
    $condition: ModelColorSwatchConditionInput
  ) {
    deleteColorSwatch(input: $input, condition: $condition) {
      id
      color
      createdAt
      updatedAt
    }
  }
`;
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
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
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
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
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
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
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      prompt
      createdAt
      updatedAt
      sessionQuestionsId
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      prompt
      createdAt
      updatedAt
      sessionQuestionsId
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      prompt
      createdAt
      updatedAt
      sessionQuestionsId
    }
  }
`;
