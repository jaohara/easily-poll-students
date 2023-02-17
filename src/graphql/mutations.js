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
      name_first
      name_last
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
      name_first
      name_last
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
      name_first
      name_last
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
        name_first
        name_last
        createdAt
        updatedAt
      }
      questions {
        nextToken
      }
      guests_in {
        nextToken
      }
      guests_waiting {
        nextToken
      }
      link_name {
        name
        id
        createdAt
        updatedAt
        linkNamePollId
      }
      id
      title
      free_join
      createdAt
      updatedAt
      userPollsId
      guestPollsId
      pollLink_nameId
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
        name_first
        name_last
        createdAt
        updatedAt
      }
      questions {
        nextToken
      }
      guests_in {
        nextToken
      }
      guests_waiting {
        nextToken
      }
      link_name {
        name
        id
        createdAt
        updatedAt
        linkNamePollId
      }
      id
      title
      free_join
      createdAt
      updatedAt
      userPollsId
      guestPollsId
      pollLink_nameId
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
        name_first
        name_last
        createdAt
        updatedAt
      }
      questions {
        nextToken
      }
      guests_in {
        nextToken
      }
      guests_waiting {
        nextToken
      }
      link_name {
        name
        id
        createdAt
        updatedAt
        linkNamePollId
      }
      id
      title
      free_join
      createdAt
      updatedAt
      userPollsId
      guestPollsId
      pollLink_nameId
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
        free_join
        createdAt
        updatedAt
        userPollsId
        guestPollsId
        pollLink_nameId
      }
      answers {
        nextToken
      }
      id
      prompt
      answer_options
      question_type
      createdAt
      updatedAt
      pollQuestionsId
      guestQuestionsId
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
        free_join
        createdAt
        updatedAt
        userPollsId
        guestPollsId
        pollLink_nameId
      }
      answers {
        nextToken
      }
      id
      prompt
      answer_options
      question_type
      createdAt
      updatedAt
      pollQuestionsId
      guestQuestionsId
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
        free_join
        createdAt
        updatedAt
        userPollsId
        guestPollsId
        pollLink_nameId
      }
      answers {
        nextToken
      }
      id
      prompt
      answer_options
      question_type
      createdAt
      updatedAt
      pollQuestionsId
      guestQuestionsId
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
        answer_options
        question_type
        createdAt
        updatedAt
        pollQuestionsId
        guestQuestionsId
      }
      owner {
        id
        name
        key
        createdAt
        updatedAt
        pollGuests_inId
        pollGuests_waitingId
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
        answer_options
        question_type
        createdAt
        updatedAt
        pollQuestionsId
        guestQuestionsId
      }
      owner {
        id
        name
        key
        createdAt
        updatedAt
        pollGuests_inId
        pollGuests_waitingId
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
        answer_options
        question_type
        createdAt
        updatedAt
        pollQuestionsId
        guestQuestionsId
      }
      owner {
        id
        name
        key
        createdAt
        updatedAt
        pollGuests_inId
        pollGuests_waitingId
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
      polls {
        nextToken
      }
      questions {
        nextToken
      }
      answers {
        nextToken
      }
      id
      name
      key
      createdAt
      updatedAt
      pollGuests_inId
      pollGuests_waitingId
    }
  }
`;
export const updateGuest = /* GraphQL */ `
  mutation UpdateGuest(
    $input: UpdateGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    updateGuest(input: $input, condition: $condition) {
      polls {
        nextToken
      }
      questions {
        nextToken
      }
      answers {
        nextToken
      }
      id
      name
      key
      createdAt
      updatedAt
      pollGuests_inId
      pollGuests_waitingId
    }
  }
`;
export const deleteGuest = /* GraphQL */ `
  mutation DeleteGuest(
    $input: DeleteGuestInput!
    $condition: ModelGuestConditionInput
  ) {
    deleteGuest(input: $input, condition: $condition) {
      polls {
        nextToken
      }
      questions {
        nextToken
      }
      answers {
        nextToken
      }
      id
      name
      key
      createdAt
      updatedAt
      pollGuests_inId
      pollGuests_waitingId
    }
  }
`;
export const createLinkName = /* GraphQL */ `
  mutation CreateLinkName(
    $input: CreateLinkNameInput!
    $condition: ModelLinkNameConditionInput
  ) {
    createLinkName(input: $input, condition: $condition) {
      poll {
        id
        title
        free_join
        createdAt
        updatedAt
        userPollsId
        guestPollsId
        pollLink_nameId
      }
      name
      id
      createdAt
      updatedAt
      linkNamePollId
    }
  }
`;
export const updateLinkName = /* GraphQL */ `
  mutation UpdateLinkName(
    $input: UpdateLinkNameInput!
    $condition: ModelLinkNameConditionInput
  ) {
    updateLinkName(input: $input, condition: $condition) {
      poll {
        id
        title
        free_join
        createdAt
        updatedAt
        userPollsId
        guestPollsId
        pollLink_nameId
      }
      name
      id
      createdAt
      updatedAt
      linkNamePollId
    }
  }
`;
export const deleteLinkName = /* GraphQL */ `
  mutation DeleteLinkName(
    $input: DeleteLinkNameInput!
    $condition: ModelLinkNameConditionInput
  ) {
    deleteLinkName(input: $input, condition: $condition) {
      poll {
        id
        title
        free_join
        createdAt
        updatedAt
        userPollsId
        guestPollsId
        pollLink_nameId
      }
      name
      id
      createdAt
      updatedAt
      linkNamePollId
    }
  }
`;
