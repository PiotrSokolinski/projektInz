import gql from 'graphql-tag'

export default gql`
  query getEvents($id: ID!, $dateFrom: String!, $dateTo: String!) {
    getEvents(id: $id, dateFrom: $dateFrom, dateTo: $dateTo) {
      id
      name
      startDate
      endDate
      invitedMembers {
        id
      }
      author {
        id
        color
      }
    }
    group(id: $id) {
      id
      members {
        id
        firstName
        lastName
        avatarUrl
      }
    }
  }
`
