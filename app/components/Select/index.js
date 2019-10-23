/**
 *
 * Select
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Help, Field } from 'react-bulma-components/lib/components/form'
import ReactSelect /* , { components } */ from 'react-select'
// import get from 'lodash/get'
import Label from '../Label'
import { customStyles /* , Image */ } from './styled'

const Select = ({
  backgroundColor,
  label,
  disabled,
  error,
  icon,
  selectProps,
  className,
  id,
  insideModal,
  ...restProps
}) => (
  // const customComponents = {
  //   IndicatorSeparator: () => null,
  //   DropdownIndicator: props => (
  //     <components.DropdownIndicator {...props}>
  //       <Image src={icon} isOpen={get(props, 'selectProps.menuIsOpen', false)} />
  //     </components.DropdownIndicator>
  //   ),
  // }
  <Field className={className} id={id}>
    {label && <Label label={label} error={error} />}
    {/* <SelectWrapper backgroundColor={backgroundColor} error={error}> */}
    <ReactSelect
      styles={customStyles}
      // components={customComponents}
      classNamePrefix="select"
      className="react-select"
      menuPortalTarget={insideModal && document.getElementById('modal-overlay')}
      isDisabled={disabled}
      {...selectProps}
      {...restProps}
    />
    {/* </SelectWrapper> */}
    {error && <Help color="danger">{error}</Help>}
  </Field>
)

Select.propTypes = {
  label: PropTypes.string,
  selectProps: PropTypes.shape({
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  }),
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  error: PropTypes.string,
  icon: PropTypes.string,
  id: PropTypes.string,
  insideModal: PropTypes.bool,
}

Select.defaultProps = {
  backgroundColor: null,
  selectProps: {
    value: '',
    placeholder: '',
    onChange: () => {},
  },
  disabled: false,
  error: '',
  insideModal: false,
}

export default Select
