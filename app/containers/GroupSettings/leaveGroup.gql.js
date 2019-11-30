import gql from 'graphql-tag'

export default gql`
  mutation removeUserFromGroup($id: ID!) {
    removeUserFromGroup(id: $id) {
      id
    }
  }
`
