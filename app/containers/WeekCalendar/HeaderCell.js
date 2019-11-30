import React from 'react'
import PropTypes from 'prop-types'

import { StyledTitle } from './styled'
import { DAY_FORMAT } from './constants'

const HeaderCell = ({ date }) => <StyledTitle>{date.format(DAY_FORMAT)}</StyledTitle>

HeaderCell.propTypes = {
  date: PropTypes.object.isRequired,
}
export default HeaderCell
