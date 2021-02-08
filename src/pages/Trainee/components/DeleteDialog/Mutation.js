import { gql } from 'apollo-boost';

const DELETE_USER = gql`
mutation deleteTrainee($originalId: ID!){
    deleteTrainee(originalId: $originalId)
}
`;
export {
  DELETE_USER,
};
