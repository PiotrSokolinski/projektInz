import gql from 'graphql-tag'

export default gql`
  mutation requestPasswordResetMutation($email: String!) {
    requestPasswordReset(email: $email) {
      success
    }
  }
`
