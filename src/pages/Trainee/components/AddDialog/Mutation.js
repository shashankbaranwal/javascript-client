import { gql } from 'apollo-boost';

const CREATE_USER = gql`
mutation
  createTrainee($name: String!, $email: String!, $password: String!){
    createTrainee(user:{name: $name, email: $email, password: $password, role: "trainee" }){
            name
            email
    }
}
`;

export {
  CREATE_USER,
};
