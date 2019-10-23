import styled from 'styled-components'

import { Colors } from 'themes'

export const Container = styled.div``

export const Title = styled.div`
  color: ${Colors.black};
  font-size: 15px;
  margin-right: 30px;
`

const BUTTON_COMMONS = `
    outline: none;
    border: none;
    height: 35px;
    border-radius: 5px;
    width: 150px;
    cursor: pointer;

`

export const ConfirmButton = styled.button`
  ${BUTTON_COMMONS};
  border: 1px solid ${Colors.radicalRed};
  color: ${Colors.black};
  margin-left: 30px;
  &:hover {
    border: none;
    background: ${Colors.radicalRed};
    color: ${Colors.white};
  }
`

export const DeclineButton = styled.button`
  ${BUTTON_COMMONS};
  border: 1px solid ${Colors.mountainMeadow};
  color: ${Colors.black};
  margin-right: 30px;
  &:hover {
    border: none;
    background: ${Colors.mountainMeadow};
    color: ${Colors.white};
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  margin: 0 -20px;
  border-top: 1px solid ${Colors.edward};
`

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
