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
      name_first
      name_last
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
        name_first
        name_last
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
        free_join
        createdAt
        updatedAt
        userPollsId
        guestPollsId
        pollLink_nameId
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
        answer_options
        question_type
        createdAt
        updatedAt
        pollQuestionsId
        guestQuestionsId
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
export const listGuests = /* GraphQL */ `
  query ListGuests(
    $filter: ModelGuestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        key
        createdAt
        updatedAt
        pollGuests_inId
        pollGuests_waitingId
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
