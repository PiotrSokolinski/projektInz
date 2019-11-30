import gql from 'graphql-tag'

export default gql`
  mutation registerMutation($data: inputUser!) {
    register(data: $data) {
      id
      email
      firstName
      lastName
      token
      group {
        id
      }
    }
  }
`
