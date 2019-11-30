import gql from 'graphql-tag'

export default gql`
  query getGroupTasks($id: ID!) {
    getGroupTasks(id: $id) {
      id
      name
      description
      status
      priority
      createdAt
      assignee {
        id
        firstName
        lastName
        avatarUrl
      }
      author {
        id
        firstName
        lastName
        avatarUrl
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
