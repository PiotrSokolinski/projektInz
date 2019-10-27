import styled from 'styled-components'
import { ArrowUp } from 'styled-icons/feather/ArrowUp'

import Select from 'components/Select'

import { Colors } from 'themes'

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: center;
  & > button {
    width: 200px;
  }
`

export const Container = styled.div`
  margin-top: 20px;
  width: 45vw;
  margin-right: 25px;
`

export const Wrapper = styled.div`
  border: 1px solid ${Colors.edward};
  border-radius: 20px;
  margin: 20px 50px;
  padding: 25px;
`

export const Header = styled.div`
  color: ${Colors.black};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.02em;
  line-height: 36px;
  text-align: center;
`

export const SelectsContainer = styled.div`
  display: flex;
  & > div:first-of-type {
    margin-right: 15px;
  }
`
export const SelectDropdown = styled(Select)`
  flex: 1;
`

const getArrowPosition = props => {
  switch (props.priority) {
    case 'High':
      return ''
    case 'Medium':
      return 'rotate(-90deg)'
    case 'Low':
      return 'rotate(-180deg)'
    default:
      return ''
  }
}

const getArrowColor = props => {
  switch (props.priority) {
    case 'High':
      return 'red'
    case 'Medium':
      return 'orange'
    case 'Low':
      return 'green'
    default:
      return 'red'
  }
}

export const Arrow = styled(ArrowUp)`
  margin-left: 8px;
  transform: ${props => getArrowPosition(props)};
  color: ${props => getArrowColor(props)};
`

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`
export const SelectName = styled.div`
  margin-right: 8px;
`
