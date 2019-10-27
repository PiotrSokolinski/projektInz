/**
 *
 * Modal
 *
 */

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useAnimation } from 'framer-motion'
import * as Styled from './styled'

const ESC_KEY_CODE = 27

const springTransition = {
  type: 'spring',
  damping: 22,
  stiffness: 400,
}

const defaultTransition = {
  duration: 0.15,
}

const modalHiddenAnimationConfig = {
  scale: 0.5,
  transition: defaultTransition,
}
const modalVisibleAnimation = {
  scale: 1,
  transition: springTransition,
}
const backgroundHiddenAnimationConfig = {
  opacity: 0,
  transition: defaultTransition,
}
const backgroundVisibleAnimationConfig = {
  opacity: 1,
  transition: defaultTransition,
}

const Modal = ({ description, title, children, onClose, visible: shouldBeVisible, maxWidth, className }) => {
  const [renderModal, setRenderModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const modalContainer = useRef(null)
  const modalOverlay = useRef(null)
  const containerAnimationController = useAnimation()
  const backgroundAnimationController = useAnimation()
  const handleClick = event => {
    const { target } = event
    if (
      modalOverlay.current &&
      modalContainer.current &&
      modalOverlay.current.contains(target) &&
      !modalContainer.current.contains(target)
    )
      onClose()
  }

  const handleKeyUp = event => {
    if (event.keyCode === ESC_KEY_CODE) onClose()
  }

  useEffect(() => {
    window.addEventListener('click', handleClick, false)
    window.addEventListener('keyup', handleKeyUp, false)
    return () => {
      window.removeEventListener('click', handleClick, false)
      window.removeEventListener('keyup', handleKeyUp, false)
    }
  }, [])

  useEffect(() => {
    if (shouldBeVisible) {
      if (!renderModal) {
        setRenderModal(true)
      } else if (!showModal) {
        backgroundAnimationController.start(backgroundVisibleAnimationConfig)
        containerAnimationController.start(modalVisibleAnimation)
        setShowModal(true)
      }
    } else if (renderModal) {
      if (showModal) {
        backgroundAnimationController.start(backgroundHiddenAnimationConfig)
        containerAnimationController.start(modalHiddenAnimationConfig).then(() => setRenderModal(false))
        setShowModal(false)
      }
    }
  }, [shouldBeVisible, renderModal, showModal])

  return (
    renderModal && (
      <Styled.Background
        className={className}
        ref={modalOverlay}
        id="modal-overlay"
        initial={backgroundHiddenAnimationConfig}
        animate={backgroundAnimationController}
      >
        <Styled.Container
          className="modal-container"
          maxWidth={maxWidth}
          ref={modalContainer}
          initial={modalHiddenAnimationConfig}
          animate={containerAnimationController}
        >
          <Styled.Header className="modal-header">
            <Styled.TextContainer>
              <Styled.Title className="modal-title">{title}</Styled.Title>
              <Styled.Description>{description}</Styled.Description>
            </Styled.TextContainer>
            <Styled.Close size="22" onClick={onClose} />
          </Styled.Header>
          <Styled.Content>{children}</Styled.Content>
        </Styled.Container>
      </Styled.Background>
    )
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  maxWidth: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  visible: PropTypes.bool,
}

Modal.defaultProps = {
  description: '',
  maxWidth: 500,
  visible: true,
}

export default Modal
