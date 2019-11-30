import gql from 'graphql-tag'

export default gql`
  mutation updateGroup($data: inputUpdateGroup!) {
    updateGroup(data: $data) {
      id
      name
      avatarUrl
      address
      number
      zipCode
      city
      country
    }
  }
`
