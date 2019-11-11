/**
 *
 * Dashboard
 *
 */

import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import CurrentGroupTasks from 'containers/CurrentGroupTasks'
import EventInformation from 'components/EventInformation'
import InformationTile from 'components/InformationTile'
import MembersList from 'containers/MembersList'
import GroupSettings from 'containers/GroupSettings'
import Modal from 'components/Modal'
import TaskInformation from 'components/TaskInformation'
import TextChat from 'containers/TextChat'
import UserAvatar from 'components/UserAvatar'

import messages from './messages'
import * as Styled from './styled'

const Dashboard = () => {
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
          <UserAvatar size="middle" image="" />
          <Styled.GroupName>Group name</Styled.GroupName>
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
            <MembersList />
            <InformationTile icon={Styled.TaskIcon} onOpen={openModalTask} />
            <InformationTile icon={Styled.EventAvailableIcon} onOpen={openModalEvent} />
          </TabPanel>
          <TabPanel>
            <CurrentGroupTasks />
          </TabPanel>
          <TabPanel>
            <GroupSettings />
          </TabPanel>
        </Tabs>
      </Styled.TabsContainer>
      <TextChat />
      <Modal
        visible={isModalTaskVisible}
        title={
          <Styled.ModalTitleContainer>
            Title of the task
            <Styled.Arrow size="35" priority="High" />
          </Styled.ModalTitleContainer>
        }
        onClose={closeModalTask}
      >
        <TaskInformation />
      </Modal>
      <Modal visible={isModalEventVisible} title="Title of the event" onClose={closeModalEvent}>
        <EventInformation />
      </Modal>
    </Styled.Container>
  )
}

Dashboard.propTypes = {}

export default Dashboard
