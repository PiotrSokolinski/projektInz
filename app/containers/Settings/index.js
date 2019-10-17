/**
 *
 * Settings
 *
 */

import React, { useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'

import Modal from 'components/Modal'
import UserAvatar from 'components/UserAvatar'
import ChangeCredentials from 'containers/ChangeCredentials'
import ChangePassword from 'containers/ChangePassword'
import ChangeMail from 'containers/ChangeMail'

import messages from './messages'
import * as Styled from './styled'

const initialValues = { firstName: 'Piotr', lastName: 'Sokolinski', nick: 'Piotrek' }

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

  return (
    <Styled.Container>
      <Styled.ContentWrapper>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Styled.InformationWrapper>
          <Styled.DetailsWrapper>
            <Styled.PhotoWrapper>
              <UserAvatar size="large" />
              <Dropzone accept="image/*" multiple={false} ref={editProfilePhotoDropzone} noDrag onDrop={() => {}}>
                {({ getRootProps, getInputProps }) => (
                  <Styled.EditPhotoButton {...getRootProps()} inverted stable onClick={onEditPhotoClick}>
                    <input {...getInputProps()} />
                    <FormattedMessage {...messages.editPhoto} />
                  </Styled.EditPhotoButton>
                )}
              </Dropzone>
            </Styled.PhotoWrapper>
            <Styled.InputsWrapper>
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
                    <Styled.AccoutInput
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
                    />
                    <Styled.EditButton
                      inverted={!isEditable}
                      stable={!isEditable}
                      onClick={handleSubmit && editDetails}
                    >
                      <FormattedMessage {...messages[isEditable ? 'submitChanges' : 'editDetails']} />
                    </Styled.EditButton>
                  </React.Fragment>
                )}
              </Formik>
            </Styled.InputsWrapper>
          </Styled.DetailsWrapper>
          <Styled.EmailPasswordContainer>
            <Styled.ChangeHeader>
              <FormattedMessage {...messages.userCredentials} />
            </Styled.ChangeHeader>
            <Styled.ButtonsContainer>
              <Styled.ChangeContainer>
                <Styled.ChangeTitle>
                  <FormattedMessage {...messages.changeMailTitle} />
                </Styled.ChangeTitle>
                <Styled.ChangeButton onClick={() => setIsMailModalVisible(true)}>
                  <FormattedMessage {...messages.changeMail} />
                </Styled.ChangeButton>
              </Styled.ChangeContainer>
              <Styled.ChangeContainer>
                <Styled.ChangeTitle>
                  <FormattedMessage {...messages.chagnePasswordTitle} />
                </Styled.ChangeTitle>
                <Styled.ChangeButton onClick={() => setIsPasswordModalVisible(true)}>
                  <FormattedMessage {...messages.changePassword} />
                </Styled.ChangeButton>
              </Styled.ChangeContainer>
            </Styled.ButtonsContainer>
          </Styled.EmailPasswordContainer>
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
