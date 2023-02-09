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
