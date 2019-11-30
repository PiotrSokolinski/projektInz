import gql from 'graphql-tag'

export default gql`
  mutation changeEmail($password: String!, $email: String!) {
    changeEmail(password: $password, email: $email) {
      id
    }
  }
`
