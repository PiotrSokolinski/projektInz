/**
 *
 * InvitePerson
 *
 */

import React, { useState } from 'react'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'

import Input from 'components/Input'
import Button from 'components/Button'

import messages from './messages'
import * as Styled from './styled'

const initialValues = { person1: '', person2: '', person3: '' }

const validationSchema = (intl, alreadyInSystem) => {
  if (alreadyInSystem)
    return Yup.object().shape({
      person1: Yup.string().email(intl.formatMessage(messages.emailInvalidError)),
    })
  return Yup.object().shape({
    person1: Yup.string().email(intl.formatMessage(messages.emailInvalidError)),
    person2: Yup.string().email(intl.formatMessage(messages.emailInvalidError)),
    person3: Yup.string().email(intl.formatMessage(messages.emailInvalidError)),
  })
}

const InvitePerson = ({ intl, history, alreadyInSystem, onClose }) => {
  const [checked, setChecked] = useState(false)
  const sendInvitations = (values, actions) => {
    if (!alreadyInSystem) history.push('/')

    actions.resetForm(initialValues)

    if (!checked) onClose()
  }
  const toggleCheckbox = () => {
    setChecked(!checked)
  }
  return (
    <Styled.Container>
      <Styled.Wrapper alreadyInSystem={alreadyInSystem}>
        {!alreadyInSystem && (
          <Styled.Header>
            <FormattedMessage {...messages.header} />
          </Styled.Header>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={sendInvitations}
          validationSchema={validationSchema(intl, alreadyInSystem)}
        >
          {formikProps => {
            const {
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              // isSubmitting,
              // setFieldTouched,
              // setFieldValue,
              touched,
              values,
            } = formikProps
            return (
              <React.Fragment>
                <Styled.InputsContainer className="inputs-container">
                  <Input
                    id="person1Field"
                    label={intl.formatMessage(messages[alreadyInSystem ? 'universalLabel' : 'person1Label'])}
                    error={touched.person1 && errors.person1}
                    inputProps={{
                      type: 'text',
                      name: 'person1',
                      placeholder: intl.formatMessage(messages.inputPlaceholder),
                      value: values.person1,
                      onBlur: handleBlur,
                      onChange: handleChange,
                    }}
                  />
                  {!alreadyInSystem && (
                    <Input
                      id="person1Field"
                      label={intl.formatMessage(messages.person2Label)}
                      error={touched.person2 && errors.person2}
                      inputProps={{
                        type: 'text',
                        name: 'person2',
                        placeholder: intl.formatMessage(messages.inputPlaceholder),
                        value: values.person2,
                        onBlur: handleBlur,
                        onChange: handleChange,
                      }}
                    />
                  )}
                  {!alreadyInSystem && (
                    <Input
                      id="person1Field"
                      label={intl.formatMessage(messages.person3Label)}
                      error={touched.person3 && errors.person3}
                      inputProps={{
                        type: 'text',
                        name: 'person3',
                        placeholder: intl.formatMessage(messages.inputPlaceholder),
                        value: values.person3,
                        onBlur: handleBlur,
                        onChange: handleChange,
                      }}
                    />
                  )}
                </Styled.InputsContainer>
                <Styled.ButtonsContainer>
                  <Button type="submit" onClick={handleSubmit}>
                    <FormattedMessage {...messages.buttonTitle} />
                  </Button>
                  {!alreadyInSystem && (
                    <Styled.Link to="/">
                      <FormattedMessage {...messages.skip} />
                    </Styled.Link>
                  )}
                  {alreadyInSystem && (
                    <Styled.StyledCheckbox
                      label={intl.formatMessage(messages.anotherOne)}
                      checked={checked}
                      onChange={toggleCheckbox}
                    />
                  )}
                </Styled.ButtonsContainer>
              </React.Fragment>
            )
          }}
        </Formik>
      </Styled.Wrapper>
    </Styled.Container>
  )
}

InvitePerson.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  alreadyInSystem: PropTypes.bool,
  onClose: PropTypes.func,
}

InvitePerson.defaultProps = {
  alreadyInSystem: false,
  onClose: () => {},
}

export default injectIntl(InvitePerson)
