/**
 *
 * Logout
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { compose } from 'redux'
import { connect } from 'react-redux'
import appLocalStorage from 'utils/localStorage'
import UserActions from '../../redux/UserRedux'

export class Logout extends Component {
  componentWillMount() {
    this.props.client.cache.reset()
    appLocalStorage.removeSession()
    this.props.clearUserData()
  }

  render() {
    return <Redirect to="/login" />
  }
}

Logout.propTypes = {
  clearUserData: PropTypes.func.isRequired,
  client: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  clearUserData: UserActions.clearData,
}

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withApollo,
)(Logout)
