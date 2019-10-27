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

const TaskInformation = () => (
  <Styled.Container>
    <Styled.DescriptionTitle>
      <FormattedMessage {...messages.description} />
    </Styled.DescriptionTitle>
    <Styled.Description>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
      PageMaker including versions of Lorem Ipsum.
    </Styled.Description>
    <Styled.AuthorContainer>
      <FormattedMessage {...messages.author} values={{ author: <b>Piotr Sokolinski</b> }} />
      <FormattedMessage
        {...messages.createdAt}
        values={{ createdAt: <b>{dayjs().format('DD/MM/YYYY MM:hh:mm')}</b> }}
      />
    </Styled.AuthorContainer>
  </Styled.Container>
)

TaskInformation.propTypes = {}

export default TaskInformation
