/**
 *
 * Dashboard
 *
 */

import React from 'react'
// import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import TextChat from 'containers/TextChat'
import MembersList from 'containers/MembersList'
import messages from './messages'
import * as Styled from './styled'

const Dashboard = () => (
  <Styled.Container>
    <Styled.TabsContainer>
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
        </TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </Tabs>
    </Styled.TabsContainer>
    <TextChat />
  </Styled.Container>
)

Dashboard.propTypes = {}

export default Dashboard
