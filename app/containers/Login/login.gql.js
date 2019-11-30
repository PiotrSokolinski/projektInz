import gql from 'graphql-tag'

export default gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      role
      avatarUrl
      token
      color
      group {
        id
      }
    }
  }
`
