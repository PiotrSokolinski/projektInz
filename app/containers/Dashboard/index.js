/**
 *
 * Dashboard
 *
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import { FormattedMessage } from 'react-intl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { compose, Query } from 'react-apollo'

import appLocalStorage from 'utils/localStorage'
import CurrentGroupTasks from 'containers/CurrentGroupTasks'
import EventInformation from 'components/EventInformation'
import InformationTile from 'components/InformationTile'
import MembersList from 'containers/MembersList'
import GroupSettings from 'containers/GroupSettings'
import Modal from 'components/Modal'
import TaskInformation from 'components/TaskInformation'
import TextChat from 'containers/TextChat'
import UserAvatar from 'components/UserAvatar'
import InformationBox from 'components/InformationBox'
import Spinner from 'components/Spinner'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import GET_GROUP_INFO from './getGroupInfo.gql'

const Dashboard = ({ data }) => {
  const groupData = get(data, 'group', null)
  const taskData = get(data, 'getTask', null)
  const eventData = get(data, 'getEvent', null)

  const [isModalTaskVisible, setIsModalTaskVisible] = useState(false)
  const [isModalEventVisible, setIsModalEventVisible] = useState(false)
  const closeModalTask = () => setIsModalTaskVisible(false)
  const openModalTask = () => setIsModalTaskVisible(true)
  const closeModalEvent = () => setIsModalEventVisible(false)
  const openModalEvent = () => setIsModalEventVisible(true)

  return (
    <Styled.Container>
      <Styled.TabsContainer>
        <Styled.GroupInfoContainer>
          <UserAvatar size="middle" image={get(groupData, 'avatarUrl', '')} />
          <Styled.GroupName>{groupData.name}</Styled.GroupName>
        </Styled.GroupInfoContainer>
        <Tabs>
          <TabList>
            <Tab>
              <FormattedMessage {...messages.membersList} />
            </Tab>
            <Tab>
              <FormattedMessage {...messages.tasks} />
            </Tab>
            <Tab>
              <FormattedMessage {...messages.settings} />
            </Tab>
          </TabList>
          <TabPanel>
            <MembersList members={groupData.members} />
            <InformationTile
              icon={Styled.TaskIcon}
              onOpen={openModalTask}
              title={get(taskData, 'name', 'You are up to date')}
              isIcon={!!taskData}
            />
            <InformationTile
              icon={Styled.EventAvailableIcon}
              onOpen={openModalEvent}
              title={get(eventData, 'name', 'You are up to date')}
              isIcon={!!eventData}
            />
          </TabPanel>
          <TabPanel>
            <CurrentGroupTasks />
          </TabPanel>
          <TabPanel>
            <GroupSettings />
          </TabPanel>
        </Tabs>
      </Styled.TabsContainer>
      <TextChat members={groupData.members} name={groupData.name} />
      {taskData && (
        <Modal
          visible={isModalTaskVisible}
          title={
            <Styled.ModalTitleContainer>
              {taskData.name}
              <Styled.Arrow size="35" priority={taskData.priority} />
            </Styled.ModalTitleContainer>
          }
          onClose={closeModalTask}
        >
          <TaskInformation taskData={taskData} />
        </Modal>
      )}
      {eventData && (
        <Modal visible={isModalEventVisible} title={eventData.name} onClose={closeModalEvent}>
          <EventInformation eventData={eventData} />
        </Modal>
      )}
    </Styled.Container>
  )
}

const withQuery = Component => props => (
  <Query query={GET_GROUP_INFO} variables={{ id: appLocalStorage.getSession().group.id }}>
    {({ loading, error, data }) => {
      if (loading)
        return (
          <Styled.SpinnerContainer>
            <Spinner size={15} border={1.5} />
          </Styled.SpinnerContainer>
        )
      const errors = formatGraphqlErrors(error)
      if (!isEmpty(errors)) return <InformationBox fullWidth>{head(errors)}</InformationBox>
      return <Component {...props} data={data} />
    }}
  </Query>
)

Dashboard.propTypes = {}

export default compose(withQuery)(Dashboard)
