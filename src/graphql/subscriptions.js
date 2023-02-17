/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($filter: ModelSubscriptionPollFilterInput) {
    onCreatePoll(filter: $filter) {
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
      free_join_active
      free_join
      createdAt
      updatedAt
      userPollsId
      pollLink_nameId
    }
  }
`;
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($filter: ModelSubscriptionPollFilterInput) {
    onUpdatePoll(filter: $filter) {
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
      free_join_active
      free_join
      createdAt
      updatedAt
      userPollsId
      pollLink_nameId
    }
  }
`;
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($filter: ModelSubscriptionPollFilterInput) {
    onDeletePoll(filter: $filter) {
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
      free_join_active
      free_join
      createdAt
      updatedAt
      userPollsId
      pollLink_nameId
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onCreateQuestion(filter: $filter) {
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
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
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onUpdateQuestion(filter: $filter) {
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
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
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
    onDeleteQuestion(filter: $filter) {
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
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
    }
  }
`;
export const onCreateAnswer = /* GraphQL */ `
  subscription OnCreateAnswer($filter: ModelSubscriptionAnswerFilterInput) {
    onCreateAnswer(filter: $filter) {
      question {
        id
        prompt
        answer_options
        question_type
        createdAt
        updatedAt
        pollQuestionsId
      }
      owner {
        id
        name
        key
        createdAt
        updatedAt
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
        answer_options
        question_type
        createdAt
        updatedAt
        pollQuestionsId
      }
      owner {
        id
        name
        key
        createdAt
        updatedAt
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
        answer_options
        question_type
        createdAt
        updatedAt
        pollQuestionsId
      }
      owner {
        id
        name
        key
        createdAt
        updatedAt
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
      pollsIn {
        nextToken
      }
      pollsWaiting {
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
    }
  }
`;
export const onUpdateGuest = /* GraphQL */ `
  subscription OnUpdateGuest($filter: ModelSubscriptionGuestFilterInput) {
    onUpdateGuest(filter: $filter) {
      pollsIn {
        nextToken
      }
      pollsWaiting {
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
    }
  }
`;
export const onDeleteGuest = /* GraphQL */ `
  subscription OnDeleteGuest($filter: ModelSubscriptionGuestFilterInput) {
    onDeleteGuest(filter: $filter) {
      pollsIn {
        nextToken
      }
      pollsWaiting {
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
    }
  }
`;
export const onCreateLinkName = /* GraphQL */ `
  subscription OnCreateLinkName($filter: ModelSubscriptionLinkNameFilterInput) {
    onCreateLinkName(filter: $filter) {
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
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
export const onUpdateLinkName = /* GraphQL */ `
  subscription OnUpdateLinkName($filter: ModelSubscriptionLinkNameFilterInput) {
    onUpdateLinkName(filter: $filter) {
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
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
export const onDeleteLinkName = /* GraphQL */ `
  subscription OnDeleteLinkName($filter: ModelSubscriptionLinkNameFilterInput) {
    onDeleteLinkName(filter: $filter) {
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
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
export const onCreatePollGuestIn = /* GraphQL */ `
  subscription OnCreatePollGuestIn(
    $filter: ModelSubscriptionPollGuestInFilterInput
  ) {
    onCreatePollGuestIn(filter: $filter) {
      id
      pollId
      guestId
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
        pollLink_nameId
      }
      guest {
        id
        name
        key
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePollGuestIn = /* GraphQL */ `
  subscription OnUpdatePollGuestIn(
    $filter: ModelSubscriptionPollGuestInFilterInput
  ) {
    onUpdatePollGuestIn(filter: $filter) {
      id
      pollId
      guestId
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
        pollLink_nameId
      }
      guest {
        id
        name
        key
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePollGuestIn = /* GraphQL */ `
  subscription OnDeletePollGuestIn(
    $filter: ModelSubscriptionPollGuestInFilterInput
  ) {
    onDeletePollGuestIn(filter: $filter) {
      id
      pollId
      guestId
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
        pollLink_nameId
      }
      guest {
        id
        name
        key
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePollGuestWaiting = /* GraphQL */ `
  subscription OnCreatePollGuestWaiting(
    $filter: ModelSubscriptionPollGuestWaitingFilterInput
  ) {
    onCreatePollGuestWaiting(filter: $filter) {
      id
      pollId
      guestId
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
        pollLink_nameId
      }
      guest {
        id
        name
        key
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePollGuestWaiting = /* GraphQL */ `
  subscription OnUpdatePollGuestWaiting(
    $filter: ModelSubscriptionPollGuestWaitingFilterInput
  ) {
    onUpdatePollGuestWaiting(filter: $filter) {
      id
      pollId
      guestId
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
        pollLink_nameId
      }
      guest {
        id
        name
        key
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePollGuestWaiting = /* GraphQL */ `
  subscription OnDeletePollGuestWaiting(
    $filter: ModelSubscriptionPollGuestWaitingFilterInput
  ) {
    onDeletePollGuestWaiting(filter: $filter) {
      id
      pollId
      guestId
      poll {
        id
        title
        free_join_active
        free_join
        createdAt
        updatedAt
        userPollsId
        pollLink_nameId
      }
      guest {
        id
        name
        key
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
