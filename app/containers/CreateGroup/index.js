/**
 *
 * CreateGroup
 *
 */

import React, { useState, useRef } from 'react'
import * as Yup from 'yup'
import countryList from 'react-select-country-list'
import head from 'lodash/head'
import get from 'lodash/get'
import parseInt from 'lodash/parseInt'
import isEmpty from 'lodash/isEmpty'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { compose, Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import appLocalStorage from 'utils/localStorage'
import UserAvatar from 'components/UserAvatar'
import Select from 'components/Select'
import Input from 'components/Input'
import InformationBox from 'components/InformationBox'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'

import messages from './messages'
import * as Styled from './styled'
import CREATE_GROUP_MUTATION from './createGroup.gql'

const initialValues = { name: '', address: '', apartmentNumber: '', zipCode: '', city: '', country: '' }

const validationSchema = intl =>
  Yup.object().shape({
    name: Yup.string().required(intl.formatMessage(messages.nameError)),
  })

const findCountry = group => filter(countryList().getData(), country => country.value === group.country)

const CreateGroup = ({ intl, history, createGroupAction, loading, errors }) => {
  if (get(appLocalStorage.getSession(), 'group.id', false)) return <Redirect to="/" />
  // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useState(null)
  const [country, setCountry] = useState('')
  const dropzoneRef = useRef(null)

  const onUploadButtonClick = () => {
    dropzoneRef.current.open()
  }

  const preparePreviewForUploadedImage = files => {
    const uploadedFile = head(files)

    if (!isEmpty(uploadedFile)) {
      setAvatar(uploadedFile)
      return window.URL.createObjectURL(uploadedFile)
    }
    return null
  }
  const createGroup = async (values, actions) => {
    const data = {
      name: values.name,
      address: values.address,
      number: parseInt(values.apartmentNumber),
      zipCode: values.zipCode,
      city: values.city,
      country: country.value,
    }
    const result = await createGroupAction({
      variables: {
        data,
      },
    })
    actions.setSubmitting(false)
    const mutationData = get(result, 'data', null)
    if (!isEmpty(mutationData)) {
      appLocalStorage.updateSession('group', mutationData.createGroup)
      history.push('/invite')
    }
  }
  const changeZipCodeValue = (event, setFieldValue) => {
    const { value } = event.target
    if (value.length <= 5) setFieldValue('zipCode', value)
  }
  return (
    <Styled.Container>
      <Styled.Header>
        <FormattedMessage {...messages.header} />
      </Styled.Header>
      <Formik initialValues={initialValues} onSubmit={createGroup} validationSchema={validationSchema(intl)}>
        {formikProps => {
          const {
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            // setFieldTouched,
            setFieldValue,
            touched,
            values,
          } = formikProps

          return (
            <Styled.FormContainer>
              <Dropzone accept="image/*" multiple={false} ref={dropzoneRef}>
                {({ acceptedFiles, getInputProps }) => (
                  <Styled.UploadAvatar>
                    <input {...getInputProps()} />
                    <UserAvatar size="big" image={preparePreviewForUploadedImage(acceptedFiles, setFieldValue)} />
                    <Styled.UploadButton type="button" stable onClick={onUploadButtonClick}>
                      <FormattedMessage {...messages.photo} />
                    </Styled.UploadButton>
                  </Styled.UploadAvatar>
                )}
              </Dropzone>
              <Styled.InputsContainer>
                <Input
                  id="groupNameField"
                  label={intl.formatMessage(messages.nameLabel)}
                  error={touched.name && errors.name}
                  inputProps={{
                    type: 'text',
                    name: 'name',
                    placeholder: intl.formatMessage(messages.namePlaceholder),
                    value: values.name,
                    onChange: handleChange,
                    onBlur: handleBlur,
                  }}
                />
                <Styled.AddressWrapper>
                  <Styled.AddressInputContainer>
                    <Input
                      id="addressField"
                      label={intl.formatMessage(messages.addressLabel)}
                      inputProps={{
                        type: 'text',
                        name: 'address',
                        placeholder: intl.formatMessage(messages.addressPlaceholder),
                        value: values.address,
                        onChange: handleChange,
                      }}
                    />
                  </Styled.AddressInputContainer>
                  <Styled.ApartmentNumberInput>
                    <Input
                      id="apartmentNumberField"
                      label={intl.formatMessage(messages.apartmentNumberLabel)}
                      inputProps={{
                        type: 'text',
                        name: 'apartmentNumber',
                        placeholder: intl.formatMessage(messages.apartmentNumberPlaceholder),
                        value: values.apartmentNumber,
                        onChange: handleChange,
                      }}
                    />
                  </Styled.ApartmentNumberInput>
                </Styled.AddressWrapper>
                <Styled.CodeAndCityContainer>
                  <Styled.ZipCodeContainer>
                    <Input
                      id="zipCodeField"
                      label={intl.formatMessage(messages.zipCodeLabel)}
                      error={touched.zipCode && errors.zipCode}
                      inputProps={{
                        type: 'number',
                        name: 'zipCode',
                        min: 0,
                        value: values.zipCode,
                        onChange: e => changeZipCodeValue(e, setFieldValue),
                        onBlur: handleBlur,
                        placeholder: intl.formatMessage(messages.zipCodePlaceholder),
                      }}
                    />
                  </Styled.ZipCodeContainer>
                  <Styled.CityInputContainer>
                    <Input
                      id="cityField"
                      label={intl.formatMessage(messages.cityLabel)}
                      error={touched.city && errors.city}
                      inputProps={{
                        type: 'text',
                        name: 'city',
                        value: values.city,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        placeholder: intl.formatMessage(messages.cityPlaceholder),
                      }}
                    />
                  </Styled.CityInputContainer>
                </Styled.CodeAndCityContainer>
                <Select
                  options={countryList().getData()}
                  label={intl.formatMessage(messages.countryLabel)}
                  placeholder={intl.formatMessage(messages.countryPlaceholder)}
                  selectProps={{
                    name: 'countryField',
                    value: country,
                    onChange: type => setCountry(type),
                  }}
                />
              </Styled.InputsContainer>
              <Styled.SubmitButton
                type="submit"
                onClick={handleSubmit}
                loading={loading && isSubmitting}
                disabled={loading && isSubmitting}
              >
                <FormattedMessage {...messages.submitButton} />
              </Styled.SubmitButton>
            </Styled.FormContainer>
          )
        }}
      </Formik>
      {!isEmpty(errors) && <InformationBox fullWidth>{head(errors)}</InformationBox>}
    </Styled.Container>
  )
}

CreateGroup.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object,
  createGroupAction: PropTypes.func,
  loading: PropTypes.bool,
  errors: PropTypes.array,
}

CreateGroup.defaultProps = {
  createGroupAction: () => {},
  loading: false,
  errors: [],
}

const withMutation = Component => props => (
  <Mutation mutation={CREATE_GROUP_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component {...props} createGroupAction={mutate} loading={loading} errors={formatGraphqlErrors(error)} />
    )}
  </Mutation>
)
export default compose(
  injectIntl,
  withMutation,
)(CreateGroup)
