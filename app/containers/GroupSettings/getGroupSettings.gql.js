import gql from 'graphql-tag'

export default gql`
  query getGroupSettings($id: ID!) {
    group(id: $id) {
      id
      avatarUrl
      name
      address
      number
      zipCode
      city
      country
      members {
        id
        firstName
        lastName
        avatarUrl
        role
        nick
        color
      }
    }
  }
`
