/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getColorSwatch = /* GraphQL */ `
  query GetColorSwatch($id: ID!) {
    getColorSwatch(id: $id) {
      id
      color
      createdAt
      updatedAt
    }
  }
`;
export const listColorSwatches = /* GraphQL */ `
  query ListColorSwatches(
    $filter: ModelColorSwatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listColorSwatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        color
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
