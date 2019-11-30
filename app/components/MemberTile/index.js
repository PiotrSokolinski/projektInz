/**
 *
 * MemberTile
 *
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import remove from 'lodash/remove'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose, Mutation } from 'react-apollo'

import UserAvatar from 'components/UserAvatar'
import ConfirmationBox from 'components/ConfirmationBox'
import appLocalStorage from 'utils/localStorage'
import Spinner from 'components/Spinner'
import InformationBox from 'components/InformationBox'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import DELETE_USER_FROM_GROUP from './deleteUser.gql'
// import GET_GROUP_INFO from '../../containers/Dashboard/getGroupInfo.gql'

const MemberTile = ({
  member: { id, role, avatarUrl, firstName, lastName, number },
  intl,
  deleteUserAction,
  loading,
  errors,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const openModal = () => setIsModalVisible(true)
  const closeModal = () => setIsModalVisible(false)
  const currentUser = appLocalStorage.getSession()
  const removeUser = async () => {
    await deleteUserAction({
      variables: {
        id,
      },
    })
  }
  return (
    <Styled.Container>
      <Styled.InfoWrapper>
        <UserAvatar size="middle" image={avatarUrl} />
        <Styled.FullName>
          <span>{firstName}</span>
          <span>{lastName}</span>
        </Styled.FullName>
        {/* <Styled.Number>
          <b>
            <FormattedMessage {...messages.tel} />
          </b>
          {number}
        </Styled.Number> */}
      </Styled.InfoWrapper>
      {currentUser.id !== id && currentUser.role === 'Administrator' && <Styled.Delete size="22" onClick={openModal} />}
      <ConfirmationBox
        avatarUrl={avatarUrl}
        title={intl.formatMessage(messages.modalTitle)}
        description={`${intl.formatMessage(messages.modalDescription)} ${firstName} ${lastName}`}
        visible={isModalVisible}
        onClose={closeModal}
        error={errors}
        loading={loading}
        action={removeUser}
      />
    </Styled.Container>
  )
}

MemberTile.propTypes = {
  member: PropTypes.object,
  intl: PropTypes.object,
  deleteUserAction: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.array,
}

const withDeleteMutation = Component => props => (
  <Mutation
    mutation={DELETE_USER_FROM_GROUP}
    // update={(store, { data: { removeUserFromGroup } }) => {
    //   const data = store.readQuery({ query: GET_GROUP_INFO, variables: { id: 1, current: true } })
    //   remove(data.group.members, member => member.id === removeUserFromGroup.id)
    //   store.writeQuery({
    //     query: GET_CURRENT_GROUP_TASKS,
    //     data,
    //   })
    // }}
    refetchQueries={['getGroupInfo']}
  >
    {(mutate, { loading, error }) => (
      <Component {...props} deleteUserAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

export default compose(
  injectIntl,
  withDeleteMutation,
)(MemberTile)
