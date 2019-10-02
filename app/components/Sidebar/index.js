/**
 *
 * Sidebar
 *
 */

import React, { useState } from 'react'
import map from 'lodash/map'
// import PropTypes from 'prop-types';
import * as Styled from './styled'
import { options } from './options'

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <Styled.Container isSidebarOpen={isSidebarOpen}>
      <Styled.HamburgerMenu isSidebarOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <div></div>
      </Styled.HamburgerMenu>
      {map(options, option => {
        const isActive = option.to === window.location.pathname
        return (
          <Styled.LinkElement to={option.to} key={`el-option-${option.to}`}>
            <option.Icon size="40" isActive={isActive} />
            <Styled.Text isActive={isActive}>{option.label}</Styled.Text>
          </Styled.LinkElement>
        )
      })}
    </Styled.Container>
  )
}

Sidebar.propTypes = {}

export default Sidebar
