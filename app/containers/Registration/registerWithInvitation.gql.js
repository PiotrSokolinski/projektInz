import gql from 'graphql-tag'

export default gql`
  mutation registerMutationWithInvitation($data: inputUser!, $groupId: ID!) {
    registerWithInvitation(data: $data, groupId: $groupId) {
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
