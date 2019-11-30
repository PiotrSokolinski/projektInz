import gql from 'graphql-tag'

export default gql`
  mutation updateTask($data: inputUpdateTask!) {
    updateTask(data: $data) {
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
  }
`
