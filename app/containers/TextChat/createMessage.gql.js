import gql from 'graphql-tag'

export default gql`
  mutation createMessage($id: ID!, $text: String!) {
    createMessage(id: $id, text: $text) {
      id
    }
  }
`
