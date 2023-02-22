/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        firstName
        lastName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
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
      linkName {
        name
        id
        createdAt
        updatedAt
        linkNamePollId
      }
      id
      title
      isActive
      isLocked
      roomSize
      createdAt
      updatedAt
      userPollsId
      pollLinkNameId
    }
  }
`;
export const listPolls = /* GraphQL */ `
  query ListPolls(
    $filter: ModelPollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        isActive
        isLocked
        roomSize
        createdAt
        updatedAt
        userPollsId
        pollLinkNameId
      }
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      poll {
        id
        title
        isActive
        isLocked
        roomSize
        createdAt
        updatedAt
        userPollsId
        pollLinkNameId
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
        answerOptions
        questionType
        createdAt
        updatedAt
        pollQuestionsId
      }
      nextToken
    }
  }
`;
export const getAnswer = /* GraphQL */ `
  query GetAnswer($id: ID!) {
    getAnswer(id: $id) {
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
export const listAnswers = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        answer
        id
        createdAt
        updatedAt
        questionAnswersId
        guestAnswersId
      }
      nextToken
    }
  }
`;
export const getGuest = /* GraphQL */ `
  query GetGuest($id: ID!) {
    getGuest(id: $id) {
      poll {
        id
        title
        isActive
        isLocked
        roomSize
        createdAt
        updatedAt
        userPollsId
        pollLinkNameId
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
export const listGuests = /* GraphQL */ `
  query ListGuests(
    $filter: ModelGuestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        canVote
        id
        name
        key
        createdAt
        updatedAt
        pollGuestsId
      }
      nextToken
    }
  }
`;
export const getLinkName = /* GraphQL */ `
  query GetLinkName($id: ID!) {
    getLinkName(id: $id) {
      poll {
        id
        title
        isActive
        isLocked
        roomSize
        createdAt
        updatedAt
        userPollsId
        pollLinkNameId
      }
      name
      id
      createdAt
      updatedAt
      linkNamePollId
    }
  }
`;
export const listLinkNames = /* GraphQL */ `
  query ListLinkNames(
    $filter: ModelLinkNameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLinkNames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        id
        createdAt
        updatedAt
        linkNamePollId
      }
      nextToken
    }
  }
`;
