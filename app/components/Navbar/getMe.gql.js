import gql from 'graphql-tag'

export default gql`
  query getMe {
    whoAmI {
      id
      firstName
      lastName
    }
  }
`
