import gql from 'graphql-tag'

export default gql`
  mutation changePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword) {
      id
    }
  }
`
