/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateColorSwatch = /* GraphQL */ `
  subscription OnCreateColorSwatch(
    $filter: ModelSubscriptionColorSwatchFilterInput
  ) {
    onCreateColorSwatch(filter: $filter) {
      id
      color
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateColorSwatch = /* GraphQL */ `
  subscription OnUpdateColorSwatch(
    $filter: ModelSubscriptionColorSwatchFilterInput
  ) {
    onUpdateColorSwatch(filter: $filter) {
      id
      color
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteColorSwatch = /* GraphQL */ `
  subscription OnDeleteColorSwatch(
    $filter: ModelSubscriptionColorSwatchFilterInput
  ) {
    onDeleteColorSwatch(filter: $filter) {
      id
      color
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession($filter: ModelSubscriptionSessionFilterInput) {
    onCreateSession(filter: $filter) {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($filter: ModelSubscriptionSessionFilterInput) {
    onUpdateSession(filter: $filter) {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($filter: ModelSubscriptionSessionFilterInput) {
    onDeleteSession(filter: $filter) {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
      id
      prompt
      createdAt
      updatedAt
      sessionQuestionsId
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
      id
      prompt
      createdAt
      updatedAt
      sessionQuestionsId
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
      id
      prompt
      createdAt
      updatedAt
      sessionQuestionsId
    }
  }
`;
