/**
 *
 * CircleSpinner
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Container, RotationAnimationBox } from './styled'
import { Colors } from 'themes'

const SpinnerProps = {
  size: PropTypes.number,
  lightContent: PropTypes.bool,
}

const ExternalCircle = ({ lightContent, size }) => (
  <svg width={size} height={size} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M33.0625 17.5625C33.0625 9.00209 26.1229 2.0625 17.5625 2.0625C9.00209 2.0625 2.0625 9.00209 2.0625 17.5625C2.0625 26.1229 9.00209 33.0625 17.5625 33.0625C20.2577 33.0625 22.7922 32.3746 25 31.1648"
      stroke={Colors.white}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

ExternalCircle.propTypes = SpinnerProps

const InternalCircle = ({ lightContent, size }) => (
  <svg width={size} height={size} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 17.5C9 12.8056 12.8056 9 17.5 9C22.1944 9 26 12.8056 26 17.5C26 22.1944 22.1944 26 17.5 26C16.022 26 14.6321 25.6228 13.4214 24.9594"
      stroke={Colors.white}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

InternalCircle.propTypes = SpinnerProps

const Spinner = ({ size, lightContent }) => (
  <Container size={size}>
    <RotationAnimationBox size={size} duration={1.25}>
      <ExternalCircle size={size} lightContent={lightContent} />
    </RotationAnimationBox>
    <RotationAnimationBox size={size} duration={0.75}>
      <InternalCircle size={size} lightContent={lightContent} />
    </RotationAnimationBox>
  </Container>
)

const CircleSpinner = props => <Spinner alt="spinner" {...props} />

Spinner.propTypes = SpinnerProps

Spinner.defaultProps = {
  size: 25,
  lightContent: false,
}

export default CircleSpinner
