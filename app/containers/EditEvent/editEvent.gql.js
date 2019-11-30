import gql from 'graphql-tag'

export default gql`
  mutation updateEvent($data: inputUpdateEvent!) {
    updateEvent(data: $data) {
      id
    }
  }
`
