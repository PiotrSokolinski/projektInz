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

import InformationTile from 'components/InformationTile'
import TextChat from 'containers/TextChat'
import MembersList from 'containers/MembersList'
import UserAvatar from 'components/UserAvatar'
import Modal from 'components/Modal'
import TaskInformation from 'components/TaskInformation'
import EventInformation from 'components/EventInformation'

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
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </Tabs>
      </Styled.TabsContainer>
      <TextChat />
      <Modal visible={isModalTaskVisible} title="Title of the task" onClose={closeModalTask}>
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
