export const checkAccessLocalStorage = () => {
  try {
    return localStorage
  } catch (e) {
    return false
  }
}
