import gql from 'graphql-tag'

export default gql`
  mutation createTask($data: inputTask!) {
    createTask(data: $data) {
      id
    }
  }
`
