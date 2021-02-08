import { gql } from 'apollo-boost';

const UPDATED_TRAINEE_SUB = gql`
    subscription {
        traineeUpdated {
        name
        email
        }
    }
`;

const DELETE_TRAINEE_SUB = gql`
    subscription {
        traineeDeleted
    }
`;

export {
  DELETE_TRAINEE_SUB,
  UPDATED_TRAINEE_SUB,
};
