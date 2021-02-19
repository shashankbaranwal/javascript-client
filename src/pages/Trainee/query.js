import { gql } from '@apollo/client';

const GETALL_TRAINEES = gql`
  query GetAllTrainees($skip: Int, $limit: Int) {
    getAll(options: { skip: $skip, limit: $limit}) {
    _id
    name
    email
    password
    createdAt
    }
  }
`;

export const GET_ONE = gql`
  query GetOneTrainee($id: ID!) {
    getOneTrainee(id: $id) {
      data {
        name
        originalId
        email
        createdAt
      }
    }
  }
`;

export {
  GETALL_TRAINEES,
};
