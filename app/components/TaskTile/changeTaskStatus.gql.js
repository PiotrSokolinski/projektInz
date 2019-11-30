import gql from 'graphql-tag'

export default gql`
  mutation changeTaskStatus($id: ID!, $status: String!) {
    changeTaskStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`
