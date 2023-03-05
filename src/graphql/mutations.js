/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      polls {
        nextToken
      }
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      polls {
        nextToken
      }
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      polls {
        nextToken
      }
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const createPoll = /* GraphQL */ `
  mutation CreatePoll(
    $input: CreatePollInput!
    $condition: ModelPollConditionInput
  ) {
    createPoll(input: $input, condition: $condition) {
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
      }
      guests {
        nextToken
      }
      id
      title
      isActive
      isLocked
      roomSize
      createdAt
      updatedAt
      userPollsId
    }
  }
`;
export const updatePoll = /* GraphQL */ `
  mutation UpdatePoll(
    $input: UpdatePollInput!
    $condition: ModelPollConditionInput
  ) {
    updatePoll(input: $input, condition: $condition) {
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
      }
      guests {
        nextToken
      }
      id
      title
      isActive
      isLocked
      roomSize
      createdAt
      updatedAt
      userPollsId
    }
  }
`;
export const deletePoll = /* GraphQL */ `
  mutation DeletePoll(
    $input: DeletePollInput!
    $condition: ModelPollConditionInput
  ) {
    deletePoll(input: $input, condition: $condition) {
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
      }
      guests {
        nextToken
      }
      id
      title
      isActive
      isLocked
      roomSize
      createdAt
      updatedAt
      userPollsId
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
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
      answers {
        nextToken
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
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
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
      answers {
        nextToken
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
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
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
      answers {
        nextToken
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
`;
export const createAnswer = /* GraphQL */ `
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
`;
export const updateAnswer = /* GraphQL */ `
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
`;
export const deleteAnswer = /* GraphQL */ `
  mutation DeleteAnswer(
    $input: DeleteAnswerInput!
    $condition: ModelAnswerConditionInput
  ) {
    deleteAnswer(input: $input, condition: $condition) {
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
`;
export const createGuest = /* GraphQL */ `
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
`;
export const updateGuest = /* GraphQL */ `
  mutation UpdateGuest(
    $input: UpdateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    updateGuest(input: $input, condition: $condition) {
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
`;
export const deleteGuest = /* GraphQL */ `
  mutation DeleteGuest(
    $input: DeleteGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    deleteGuest(input: $input, condition: $condition) {
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
`;
