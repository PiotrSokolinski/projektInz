import gql from 'graphql-tag'

export default gql`
  mutation editUserDetails($id: ID!, $nick: String!, $role: String!, $color: String!) {
    editUserDetails(id: $id, nick: $nick, role: $role, color: $color) {
      id
      nick
      role
      color
    }
  }
`
