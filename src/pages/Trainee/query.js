import { gql } from 'apollo-boost';

const GET = gql`
query getAllTrainees($skip: String, $limit: String, $sortedBy: String, $sortedOrder: String ) {
    getAllTrainees(payload: { skip: $skip, limit: $limit, sortedBy: $sortedBy, sortedOrder: $sortedOrder }) {
        totalCount
        count
        data {
            name
            email
            createdAt
            _id
            originalId
        }
    }
}`;
export { GET };
