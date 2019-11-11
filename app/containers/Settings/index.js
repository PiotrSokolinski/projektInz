/**
 *
 * Settings
 *
 */

import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'

import Modal from 'components/Modal'
import UserAvatar from 'components/UserAvatar'
import ChangeCredentials from 'containers/ChangeCredentials'
import ChangePassword from 'containers/ChangePassword'
import ChangeMail from 'containers/ChangeMail'

import messages from './messages'
import * as Styled from './styled'

const initialValues = { firstName: 'Piotr', lastName: 'Sokolinski' /* nick: 'Piotrek' */ }

const validationSchema = intl =>
  Yup.object().shape({
    firstName: Yup.string().required(intl.formatMessage(messages.firstNameEmptyError)),
    lastName: Yup.string().required(intl.formatMessage(messages.lastNameEmptyError)),
  })

const Settings = ({ intl }) => {
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
                <UserAvatar size="large" image={preparePreviewForUploadedImage(acceptedFiles)} />
                <Styled.EditPhotoButton {...getRootProps()} inverted stable onClick={onEditPhotoClick}>
                  <input {...getInputProps()} />
                  <FormattedMessage {...messages.editPhoto} />
                </Styled.EditPhotoButton>
              </React.Fragment>
            )}
          </Dropzone>
        </Styled.PhotoWrapper>
        <Styled.InformationWrapper>
          <Styled.DetailsWrapper>
            <Formik onSubmit={() => {}} initialValues={initialValues} validationSchema={validationSchema(intl)}>
              {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
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
                  <Styled.EditButton inverted={!isEditable} stable={!isEditable} onClick={handleSubmit && editDetails}>
                    <FormattedMessage {...messages[isEditable ? 'submitChanges' : 'editDetails']} />
                  </Styled.EditButton>
                </React.Fragment>
              )}
            </Formik>
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
        <ChangeCredentials>
          <ChangePassword />
        </ChangeCredentials>
      </Modal>
      <Modal
        visible={isMailModalVisible}
        title={intl.formatMessage(messages.setMailTitle)}
        onClose={() => setIsMailModalVisible(false)}
      >
        <ChangeCredentials>
          <ChangeMail />
        </ChangeCredentials>
      </Modal>
    </Styled.Container>
  )
}

Settings.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(Settings)
