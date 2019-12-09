/**
 *
 * TaskInformation
 *
 */

import React from 'react'
// import PropTypes from 'prop-types';
import dayjs from 'dayjs'

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import * as Styled from './styled'

const TaskInformation = ({ taskData, isTask }) => (
  <Styled.Container>
    <Styled.DescriptionTitle>
      <FormattedMessage {...messages.description} />
    </Styled.DescriptionTitle>
    <Styled.Description>{taskData.description}</Styled.Description>
    <Styled.AuthorContainer>
      <FormattedMessage
        {...messages.author}
        values={{
          author: (
            <b>
              {taskData.author.firstName} {taskData.author.lastName}
            </b>
          ),
        }}
      />
      <FormattedMessage
        {...messages.createdAt}
        values={{ createdAt: <b>{dayjs(taskData.createdAt).format('DD/MM/YYYY MM:hh:mm')}</b> }}
      />
    </Styled.AuthorContainer>
  </Styled.Container>
)

TaskInformation.propTypes = {}

export default TaskInformation
