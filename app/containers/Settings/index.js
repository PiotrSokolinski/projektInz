/**
 *
 * Settings
 *
 */

import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
import get from 'lodash/get'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { compose, Mutation, Query } from 'react-apollo'
import appLocalStorage from 'utils/localStorage'

import InformationBox from 'components/InformationBox'
import Spinner from 'components/Spinner'
import Modal from 'components/Modal'
import UserAvatar from 'components/UserAvatar'
import ChangeCredentials from 'containers/ChangeCredentials'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import EDIT_NAME_MUTATION from './editName.gql'
import GET_ME_QUERY from '../../components/Navbar/getMe.gql'

const initialValues = user => ({ firstName: user.firstName, lastName: user.lastName })

const validationSchema = intl =>
  Yup.object().shape({
    firstName: Yup.string().required(intl.formatMessage(messages.firstNameEmptyError)),
    lastName: Yup.string().required(intl.formatMessage(messages.lastNameEmptyError)),
  })

const sendRequest = async file => {
  const storedUser = appLocalStorage.getSession()
  const formData = new FormData()
  formData.append('file', file)
  await fetch('http://localhost:5000/fileupload/user', {
    method: 'post',
    body: formData,
    headers: { Authorization: `Bearer ${get(storedUser, 'token', '')}` },
  })
}

const Settings = ({ intl, data, editNameAction, loading, errors, refetch }) => {
  const currentUser = get(data, 'whoAmI', null)
  const [isEditable, setIsEditable] = useState(false)
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
  const [isMailModalVisible, setIsMailModalVisible] = useState(false)
  const editProfilePhotoDropzone = useRef(null)
  const onEditPhotoClick = () => {
    editProfilePhotoDropzone.current.open()
  }
  const editDetails = () => setIsEditable(!isEditable)

  const preparePreviewForUploadedImage = files => {
    const uploadedFile = head(files)

    if (!isEmpty(uploadedFile)) {
      return window.URL.createObjectURL(uploadedFile)
    }
    return null
  }

  const submitEditName = async (values, actions) => {
    const result = await editNameAction({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
    })

    actions.setSubmitting(false)
    setIsEditable(false)
    appLocalStorage.updateSession('firstName', result.data.editName.firstName)
    appLocalStorage.updateSession('lastName', result.data.editName.lastName)
  }

  const onSaveButtonClick = acceptedFiles => {
    sendRequest(head(acceptedFiles))
    refetch()
  }

  return (
    <Styled.Container>
      <Styled.ContentWrapper>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Styled.PhotoWrapper>
          <Dropzone accept="image/*" multiple={false} ref={editProfilePhotoDropzone} noDrag onDrop={() => {}}>
            {({ acceptedFiles, getRootProps, getInputProps }) => (
              <React.Fragment>
                <UserAvatar
                  size="large"
                  image={preparePreviewForUploadedImage(acceptedFiles) || currentUser.avatarUrl}
                />
                <Styled.ButtonsContainer>
                  <Styled.EditPhotoButton {...getRootProps()} inverted stable onClick={onEditPhotoClick}>
                    <input {...getInputProps()} />
                    <FormattedMessage {...messages[isEmpty(acceptedFiles) ? 'editPhoto' : 'changePhoto']} />
                  </Styled.EditPhotoButton>
                  {!isEmpty(acceptedFiles) && (
                    <Styled.SaveButton onClick={() => onSaveButtonClick(acceptedFiles)}>
                      <FormattedMessage {...messages.save} />
                    </Styled.SaveButton>
                  )}
                </Styled.ButtonsContainer>
              </React.Fragment>
            )}
          </Dropzone>
        </Styled.PhotoWrapper>
        <Styled.InformationWrapper>
          <Styled.DetailsWrapper>
            <Formik
              onSubmit={submitEditName}
              initialValues={initialValues(currentUser)}
              validationSchema={validationSchema(intl)}
            >
              {({ errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <React.Fragment>
                  <Styled.AccoutInput
                    id="firstNameField"
                    label={intl.formatMessage(messages.firstNameLabel)}
                    error={touched.firstName && errors.firstName}
                    inputProps={{
                      type: 'text',
                      name: 'firstName',
                      value: values.firstName,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      disabled: !isEditable,
                    }}
                  />
                  <Styled.AccoutInput
                    id="lastNameField"
                    label={intl.formatMessage(messages.lastNameLabel)}
                    error={touched.lastName && errors.lastName}
                    inputProps={{
                      type: 'text',
                      name: 'lastName',
                      value: values.lastName,
                      onChange: handleChange,
                      onBlur: handleBlur,
                      disabled: !isEditable,
                    }}
                  />
                  {/* <Styled.AccoutInput
                      id="nickField"
                      label={intl.formatMessage(messages.nickLabel)}
                      error={touched.nick && errors.nick}
                      inputProps={{
                        type: 'text',
                        name: 'nick',
                        value: values.nick,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        disabled: !isEditable,
                      }}
                    /> */}
                  <Styled.EditButton
                    inverted={!isEditable}
                    stable={!isEditable}
                    onClick={isEditable ? handleSubmit : editDetails}
                    loading={loading && isSubmitting}
                    disabled={loading && isSubmitting}
                  >
                    <FormattedMessage {...messages[isEditable ? 'submitChanges' : 'editDetails']} />
                  </Styled.EditButton>
                </React.Fragment>
              )}
            </Formik>
            {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
          </Styled.DetailsWrapper>
          <Styled.CredentialsContainer>
            <Styled.ChangeHeader>
              <FormattedMessage {...messages.userCredentials} />
            </Styled.ChangeHeader>
            <Styled.ChangeButton onClick={() => setIsMailModalVisible(true)}>
              <FormattedMessage {...messages.changeMail} />
            </Styled.ChangeButton>
            <Styled.ChangeButton onClick={() => setIsPasswordModalVisible(true)}>
              <FormattedMessage {...messages.changePassword} />
            </Styled.ChangeButton>
          </Styled.CredentialsContainer>
        </Styled.InformationWrapper>
      </Styled.ContentWrapper>
      <Modal
        visible={isPasswordModalVisible}
        title={intl.formatMessage(messages.changePasswordTitle)}
        onClose={() => setIsPasswordModalVisible(false)}
      >
        <ChangeCredentials type="password" onClose={() => setIsPasswordModalVisible(false)} />
      </Modal>
      <Modal
        visible={isMailModalVisible}
        title={intl.formatMessage(messages.setMailTitle)}
        onClose={() => setIsMailModalVisible(false)}
      >
        <ChangeCredentials type="email" onClose={() => setIsMailModalVisible(false)} />
      </Modal>
    </Styled.Container>
  )
}

Settings.propTypes = {
  intl: PropTypes.object,
  editNameAction: PropTypes.func,
  errors: PropTypes.array,
  loading: PropTypes.bool,
}

Settings.defaultProps = {
  errors: [],
  loading: false,
  editNameAction: () => {},
}

const withMutation = Component => props => (
  <Mutation
    mutation={EDIT_NAME_MUTATION}
    update={(store, { data: { editName } }) => {
      const data = store.readQuery({ query: GET_ME_QUERY })
      data.whoAmI.firstName = editName.firstName
      data.whoAmI.lastName = editName.lastName
      store.writeQuery({
        query: GET_ME_QUERY,
        data,
      })
    }}
  >
    {(mutate, { loading, error }) => (
      <Component {...props} editNameAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)

const withQuery = Component => props => (
  <Query query={GET_ME_QUERY}>
    {({ loading, error, data, refetch }) => {
      if (loading)
        return (
          <Styled.SpinnerContainer>
            <Spinner size={5} border={1} />
          </Styled.SpinnerContainer>
        )
      const errors = formatGraphqlErrors(error)
      if (!isEmpty(errors)) return <InformationBox fullWidth>{head(errors)}</InformationBox>
      return <Component {...props} data={data} refetch={refetch} />
    }}
  </Query>
)

export default compose(
  withMutation,
  withQuery,
  injectIntl,
)(Settings)
