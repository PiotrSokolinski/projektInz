/**
 *
 * EditGroup
 *
 */

import React, { useState, useRef } from 'react'
import * as Yup from 'yup'
import countryList from 'react-select-country-list'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'

import UserAvatar from 'components/UserAvatar'
import Select from 'components/Select'
import Input from 'components/Input'

import messages from './messages'
import * as Styled from './styled'

const initialValues = { name: 'Group Name', address: '', apartmentNumber: '', zipCode: '', city: '' }

const validationSchema = intl =>
  Yup.object().shape({
    name: Yup.string().required(intl.formatMessage(messages.nameError)),
  })

const EditGroup = ({ intl }) => {
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
  const editGroup = () => {}
  const changeZipCodeValue = (event, setFieldValue) => {
    const { value } = event.target
    if (value.length <= 5) setFieldValue('zipCode', value)
  }
  return (
    <Styled.Container>
      <Formik initialValues={initialValues} onSubmit={editGroup} validationSchema={validationSchema(intl)}>
        {formikProps => {
          const {
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            // isSubmitting,
            // setFieldTouched,
            setFieldValue,
            touched,
            values,
          } = formikProps

          return (
            <Styled.AllInfromationContainer>
              <Styled.FormContainer>
                <Styled.ImportantInfoContainer>
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
                </Styled.ImportantInfoContainer>
                <Styled.InputsContainer>
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
                    id="countryField"
                    options={countryList().getData()}
                    label={intl.formatMessage(messages.countryLabel)}
                    placeholder={intl.formatMessage(messages.countryPlaceholder)}
                    selectProps={{
                      name: 'country',
                      value: country,
                      onChange: type => setCountry(type),
                    }}
                  />
                </Styled.InputsContainer>
              </Styled.FormContainer>
              <Styled.ButtonContainer>
                <Styled.SubmitButton type="submit" onClick={handleSubmit}>
                  <FormattedMessage {...messages.submitButton} />
                </Styled.SubmitButton>
              </Styled.ButtonContainer>
            </Styled.AllInfromationContainer>
          )
        }}
      </Formik>
    </Styled.Container>
  )
}

EditGroup.propTypes = {
  intl: PropTypes.object,
}

export default injectIntl(EditGroup)
