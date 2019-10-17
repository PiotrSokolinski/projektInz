import styled from 'styled-components'
import { Colors } from 'themes'
import { DotsHorizontalRounded } from 'styled-icons/boxicons-regular/DotsHorizontalRounded'

export const Dots = styled(DotsHorizontalRounded)`
  margin-right: 15px;
  cursor: pointer;
`

export const Container = styled.div`
  border: 1px solid ${Colors.silverChalice};
  border-radius: 15px;
  background: ${Colors.white};
  margin: 15px 10px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`
export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const FullName = styled.div`
  margin-left: 20px;
  font-size: 19px;
  font-weight: bold;
  color: ${Colors.black};
  span {
    margin-left: 5px;
  }
`
export const Number = styled.div`
  margin-left: 30px;
  font-size: 15px;
  color: ${Colors.black};
`
