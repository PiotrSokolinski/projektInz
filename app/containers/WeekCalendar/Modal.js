/* eslint-disable */

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Modal = ({ onRemove, start, end, onSave }) => {
  const [value, setValue] = useState('')
  const handleRemove = () => {
    onRemove()
  }
  const renderText = () => {
    if (start.isSame(end, 'day')) {
      return <span>{`${start.format('Do MMM., HH:mm')} - ${end.format('HH:mm')}`}</span>
    }
    return (
      <span>{`${start.format('Do MMM.')} - ${end.format('Do MMM.')}, ${start.format('HH:mm')} - ${end.format(
        'HH:mm',
      )}`}</span>
    )
  }
  const handleSave = () => {
    onSave({
      value,
    })
  }
  return (
    <div className="customModal">
      <div className="customModal__text">{renderText()}</div>
      <input
        className="customModal__input"
        type="text"
        placeholder="Enter something"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button className="customModal__button" onClick={handleRemove}>
        Delete
      </button>
      <button className="customModal__button customModal__button_float_right" onClick={handleSave}>
        Save
      </button>
    </div>
  )
}

Modal.propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  actionType: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
}

export default Modal
