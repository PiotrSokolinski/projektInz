import styled from 'styled-components'
import { Colors } from 'themes'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 75px);
`
export const TabsContainer = styled.div`
  margin-top: 20px;
  width: 45vw;
  margin-right: 25px;
  .react-tabs__tab-list {
    border-bottom: 1px solid ${Colors.nobel};
  }
  .react-tabs__tab {
    padding: 6px 25px;
  }
  .react-tabs__tab--selected {
    border: 1px solid ${Colors.nobel};
    border-bottom: 1px solid transparent;
    font-weight: bold;
    color: ${Colors.blueRibbon};
  }
`
