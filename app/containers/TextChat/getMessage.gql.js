import gql from 'graphql-tag'

export default gql`
  subscription newMessageCreated {
    newMessageCreated {
      id
      text
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
