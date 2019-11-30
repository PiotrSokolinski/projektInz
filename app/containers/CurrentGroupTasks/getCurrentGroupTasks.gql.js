import gql from 'graphql-tag'

export default gql`
  query getCurrentGroupTasks($id: ID!) {
    getGroupTasksToDoInProgress(id: $id) {
      id
      name
      status
    }
  }
`
