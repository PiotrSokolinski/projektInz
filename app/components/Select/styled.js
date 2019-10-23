import styled from 'styled-components'
import { Colors } from '../../themes'

// export const customStyles = {
//   control: provided => ({
//     ...provided,
//     borderWidth: '0',
//     borderRadius: '0',
//     boxShadow: '0',
//     height: '50px',
//     color: `${Colors.blueDianne}`,
//     '&:hover': {
//       borderColor: `${Colors.athensGray}`,
//     },
//   }),
//   menuPortal: base => ({ ...base, zIndex: 9999 }),
// }

export const customStyles = {
  control: provided => ({
    ...provided,
    borderWidth: '0',
    borderRadius: '5px',
    boxShadow: '0',
    border: `1px solid ${Colors.edward}`,
    color: `${Colors.black}`,
    '&:hover': {
      borderColor: `${Colors.edward}`,
    },
  }),
  menuPortal: base => ({ ...base, zIndex: 9999 }),
}

export const Image = styled.img`
  position: relative;
  top: 2px;
  right: 5px;
  transition: transform 0.2s;
  ${props => props.isOpen && 'transform: rotate(180deg);'}
`

export const SelectWrapper = styled.div`
  .react-select {
    border: 1px solid ${Colors.athensGray};
    ${({ error }) => error && `border-color: ${Colors.coral};`}

    .select__control {
      ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
    }
    .select__menu {
      z-index: 10000 !important;
    }
  }
`
