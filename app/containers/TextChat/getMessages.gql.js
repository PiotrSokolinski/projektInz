import gql from 'graphql-tag'

export default gql`
  query getMessages($id: ID!, $skip: Int!, $take: Int!) {
    getMessages(id: $id, skip: $skip, take: $take) {
      id
      text
      createdAt
      sender {
        id
        firstName
        lastName
        avatarUrl
        color
      }
    }
  }
`
