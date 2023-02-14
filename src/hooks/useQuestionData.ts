/*
  Alright, going to block out my train of thought here - I want this to be able
  to import the aws-credentials, the AWS API library, and whatever graphQL queries
  we'll need to interact with question data.

  The idea is that we want to be able to avoid reusing the boilerplate stuff from all 
  the examples.

  Now that I think about it, I probably want two hooks:

    1. useApi (to connect to our graphql api)
    2. useQuestionData (to handle interacting with our question data)

  At the moment, I can focus on making this hook (useQuestionData) just return some dummy 
  data to simulate sending and receiving data of the finalized shape.
*/


function useQuestionData() {
  // TODO: pretty much all of this
}
