/**
 *
 * UserAvatar
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { Icons } from 'themes'

import { Container } from './styled'

const UserAvatar = ({ image, size, withBorder, borderColor }) => {
  const imageHasUrl = image !== '' && image !== null && image !== undefined
  return (
    <Container className={size} withBorder={withBorder} borderColor={borderColor}>
      <img className="avatar-image" src={(imageHasUrl && image) || Icons.emptyAvatar} alt="avatar" />
    </Container>
  )
}

UserAvatar.propTypes = {
  image: PropTypes.any,
  size: PropTypes.oneOf(['tiny', 'small', 'middle', 'big', 'large']),
  withBorder: PropTypes.bool,
  borderColor: PropTypes.string,
}

UserAvatar.defaultProps = {
  image: Icons.emptyAvatar,
  size: 'small',
  withBorder: false,
}

export default UserAvatar
