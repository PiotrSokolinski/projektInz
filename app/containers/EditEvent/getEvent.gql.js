import gql from 'graphql-tag'

export default gql`
  query get($id: ID!) {
    getEvent(id: $id, current: false) {
      id
      name
      description
      startDate
      endDate
      author {
        id
        firstName
        lastName
        avatarUrl
      }
      invitedMembers {
        id
        firstName
        lastName
        avatarUrl
      }
    }
  }
`
