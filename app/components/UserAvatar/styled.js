import styled from 'styled-components'
import { Colors } from '../../themes/index'

export const Container = styled.div`
  align-items: center;
  background-color: ${Colors.white};
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 100vw;
  display: flex;
  justify-content: center;
  position: relative;

  .avatar-image {
    border-radius: 100vw;
    object-fit: cover;
  }

  &.tiny .avatar-image {
    height: 20px;
    width: 20px;
  }

  &.small .avatar-image {
    height: 30px;
    width: 30px;
  }

  &.middle .avatar-image {
    height: 60px;
    width: 60px;
  }

  &.big .avatar-image {
    height: 90px;
    width: 90px;
  }

  &.large .avatar-image {
    height: 180px;
    width: 180px;
  }
`
