import gql from 'graphql-tag'

export default gql`
  mutation createEvent($data: inputEvent!) {
    createEvent(data: $data) {
      id
    }
  }
`
