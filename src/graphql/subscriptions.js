/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAnswerForQuestion = /* GraphQL */ `
  subscription OnCreateAnswerForQuestion($questionAnswersId: ID!) {
    onCreateAnswerForQuestion(questionAnswersId: $questionAnswersId) {
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
export const onCreateGuestForPoll = /* GraphQL */ `
  subscription OnCreateGuestForPoll($pollGuestsId: ID!) {
    onCreateGuestForPoll(pollGuestsId: $pollGuestsId) {
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
export const onCreateQuestionForPoll = /* GraphQL */ `
  subscription OnCreateQuestionForPoll($pollQuestionsId: ID!) {
    onCreateQuestionForPoll(pollQuestionsId: $pollQuestionsId) {
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
export const onUpdateAnswerForQuestion = /* GraphQL */ `
  subscription OnUpdateAnswerForQuestion($questionAnswersId: ID!) {
    onUpdateAnswerForQuestion(questionAnswersId: $questionAnswersId) {
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
export const onUpdateGuestForPoll = /* GraphQL */ `
  subscription OnUpdateGuestForPoll($pollGuestsId: ID!) {
    onUpdateGuestForPoll(pollGuestsId: $pollGuestsId) {
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
export const onUpdateQuestionForPoll = /* GraphQL */ `
  subscription OnUpdateQuestionForPoll($pollQuestionsId: ID!) {
    onUpdateQuestionForPoll(pollQuestionsId: $pollQuestionsId) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($filter: ModelSubscriptionPollFilterInput) {
    onCreatePoll(filter: $filter) {
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
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($filter: ModelSubscriptionPollFilterInput) {
    onUpdatePoll(filter: $filter) {
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
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($filter: ModelSubscriptionPollFilterInput) {
    onDeletePoll(filter: $filter) {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
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
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onCreateAnswer(filter: $filter) {
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
export const onUpdateAnswer = /* GraphQL */ `
  subscription OnUpdateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onUpdateAnswer(filter: $filter) {
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
export const onDeleteAnswer = /* GraphQL */ `
  subscription OnDeleteAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onDeleteAnswer(filter: $filter) {
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
export const onCreateGuest = /* GraphQL */ `
  subscription OnCreateGuest($filter: ModelSubscriptionGuestFilterInput) {
    onCreateGuest(filter: $filter) {
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
export const onUpdateGuest = /* GraphQL */ `
  subscription OnUpdateGuest($filter: ModelSubscriptionGuestFilterInput) {
    onUpdateGuest(filter: $filter) {
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
export const onDeleteGuest = /* GraphQL */ `
  subscription OnDeleteGuest($filter: ModelSubscriptionGuestFilterInput) {
    onDeleteGuest(filter: $filter) {
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
