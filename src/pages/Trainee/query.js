import { gql } from '@apollo/client';

const GET_USER = gql`
  query getAllTrainees($skip: Int, $limit: Int, $sort: String) {
    getAllTrainees(display: {skip: $skip, limit: $limit, sort: $sort}){
    status
    message
    data {
      totalCount
      count
      data {
        _id
        name
        email
        role
        password
        createdAt
      }
    }
    }
  }
`;

export {
  GET_USER,
};
