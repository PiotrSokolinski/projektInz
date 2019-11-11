export const formatGraphqlErrors = error => {
  try {
    if (error) {
      if (error.graphQLErrors.length > 0) {
        // eslint-disable-next-line no-useless-escape
        return error.graphQLErrors.map(({ message }) => message.replace(/(?:^\[\")|(?:\"\])/g, ''))
      }
      // eslint-disable-next-line no-useless-escape
      return error.networkError.result.errors.map(({ message }) => message.replace(/(?:^\[\")|(?:\"\])/g, ''))
    }
    return []
  } catch (e) {
    return ['Unexpected error']
  }
}
