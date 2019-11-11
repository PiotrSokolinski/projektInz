import gql from 'graphql-tag'

export default gql`
  mutation setPasswordMutation($resetPasswordToken: String!, $newPassword: String!) {
    setPassword(resetPasswordToken: $resetPasswordToken, newPassword: $newPassword) {
      success
    }
  }
`
