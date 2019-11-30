import gql from 'graphql-tag'

export default gql`
  query getGroupInfo($id: ID!) {
    group(id: $id) {
      id
      avatarUrl
      name
      members {
        id
        firstName
        lastName
        avatarUrl
        role
      }
    }
    getTask(id: 0, current: true) {
      id
      name
      description
      createdAt
      status
      priority
      author {
        id
        firstName
        lastName
      }
    }
    getEvent(id: 0, current: true) {
      id
      name
      description
      startDate
      endDate
      author {
        id
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
