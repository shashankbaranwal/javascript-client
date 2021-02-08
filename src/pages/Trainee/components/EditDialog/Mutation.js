import { gql } from 'apollo-boost';

const UPDATED_USER = gql`
mutation updateTrainee($name: String, $email: String, $originalId: ID!){
    updateTrainee(user:{name: $name, email: $email, originalId: $originalId }){
      originalId
      name
      email
    }
  }
`;

export {
  UPDATED_USER,
};
