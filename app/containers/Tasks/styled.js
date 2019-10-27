import styled from 'styled-components'

import Select from 'components/Select'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 75px);
`

export const TasksContainer = styled.div`
  margin-top: 20px;
  width: 45vw;
  display: flex;
  flex-direction: column;
`

export const SelectInput = styled(Select)`
  width: 250px;
`
export const SearchInputContainer = styled.div`
  width: 100%;
  padding-right: 20px;
`
export const SearchAndSelectContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
`

export const TasksList = styled.div`
  overflow: auto;
`
