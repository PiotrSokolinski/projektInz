/**
 *
 * UserAvatar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { Icons } from 'themes'

import { Container } from './styled'

const UserAvatar = ({ image, size }) => {
  const imageHasUrl = image !== '' && image !== null && image !== undefined
  return (
    <Container className={size}>
      <img className="avatar-image" src={(imageHasUrl && image) || Icons.emptyAvatar} alt="avatar" />
    </Container>
  )
}

UserAvatar.propTypes = {
  image: PropTypes.any,
  size: PropTypes.oneOf(['tiny', 'small', 'middle', 'big', 'large']),
}

UserAvatar.defaultProps = {
  image: Icons.emptyAvatar,
  size: 'small',
}

export default UserAvatar
