import gql from 'graphql-tag'

export default gql`
  mutation createGroup($data: inputGroup!) {
    createGroup(data: $data) {
      id
    }
  }
`
