import gql from 'graphql-tag'

export default gql`
  mutation editName($firstName: String!, $lastName: String!) {
    editName(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`
