import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Colors } from '../../themes/index'

export const DatePicker = styled(ReactDatePicker)`
  background: ${props => (props.disabled ? 'whitesmoke' : Colors.white)};
  border: 1px solid ${Colors.edward};
  box-shadow: none;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 15px;
  height: 50px;
  letter-spacing: 0.02em;
  line-height: 140%;
  outline: none;
  text-indent: 15px;
  width: 100%;
  margin-top: 2px;

  .react-datepicker__input-container {
    display: block !important;
  }

  .react-datepicker__time-container,
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box,
  .react-datepicker--time-only .react-datepicker__time-container,
    width: 105px;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .react-datepicker__input-container {
    width: 100%;
  }
`
