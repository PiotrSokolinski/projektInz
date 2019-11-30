import gql from 'graphql-tag'

export default gql`
  query getTask($taskId: ID!, $groupId: ID!) {
    getTask(id: $taskId, current: false) {
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
    group(id: $groupId) {
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
