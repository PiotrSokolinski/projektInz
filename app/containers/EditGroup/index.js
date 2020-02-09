/**
 *
 * EditGroup
 *
 */

import React, { useState, useRef } from 'react'
import * as Yup from 'yup'
import countryList from 'react-select-country-list'
import head from 'lodash/head'
import get from 'lodash/get'
import parseInt from 'lodash/parseInt'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { compose, Mutation } from 'react-apollo'

import appLocalStorage from 'utils/localStorage'
import UserAvatar from 'components/UserAvatar'
import Select from 'components/Select'
import Input from 'components/Input'
import { formatGraphqlErrors } from 'utils/formatGraphqlErrors'
import InformationBox from 'components/InformationBox'

import messages from './messages'
import * as Styled from './styled'
import EDIT_GROUP_MUTATION from './editGroup.gql'

const sendRequest = async file => {
  const storedUser = appLocalStorage.getSession()
  const formData = new FormData()
  formData.append('file', file)
  await fetch('http://localhost:5000/fileupload/group', {
    method: 'post',
    body: formData,
    headers: { Authorization: `Bearer ${get(storedUser, 'token', '')}` },
  }).then(res => {
    if (res.ok) {
      console.log(res.data)
    }
  })
}

const initialValues = group => ({
  name: group.name,
  address: group.address,
  apartmentNumber: group.number,
  zipCode: group.zipCode,
  city: group.city,
})

const validationSchema = intl =>
  Yup.object().shape({
    name: Yup.string().required(intl.formatMessage(messages.nameError)),
  })

const findCountry = group => filter(countryList().getData(), country => country.value === group.country)

const EditGroup = ({ intl, groupData, editGroupAction, editGroupErrors, editGroupLoading }) => {
  // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useState(null)
  const [country, setCountry] = useState(findCountry(groupData)[0])
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
  const editGroup = async (values, actions) => {
    const data = {
      id: groupData.id,
      name: values.name,
      avatarUrl: '',
      address: values.address,
      number: parseInt(values.apartmentNumber),
      zipCode: values.zipCode,
      city: values.city,
      country: country.value,
    }
    const result = await editGroupAction({
      variables: { data },
    })
    actions.setSubmitting(false)
    const mutationData = get(result, 'data', null)
    if (!isEmpty(mutationData)) {
      sendRequest(avatar)
    }
  }
  const changeZipCodeValue = (event, setFieldValue) => {
    const { value } = event.target
    if (value.length <= 5) setFieldValue('zipCode', value)
  }
  return (
    <Styled.Container>
      <Formik initialValues={initialValues(groupData)} onSubmit={editGroup} validationSchema={validationSchema(intl)}>
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
            <Styled.AllInfromationContainer>
              <Styled.FormContainer>
                <Styled.ImportantInfoContainer>
                  <Dropzone accept="image/*" multiple={false} ref={dropzoneRef}>
                    {({ acceptedFiles, getInputProps }) => (
                      <Styled.UploadAvatar>
                        <input {...getInputProps()} />
                        <UserAvatar
                          size="big"
                          image={preparePreviewForUploadedImage(acceptedFiles) || groupData.avatarUrl}
                        />
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
                <Styled.SubmitButton
                  type="submit"
                  onClick={handleSubmit}
                  loading={isSubmitting && editGroupLoading}
                  disabled={isSubmitting && editGroupLoading}
                >
                  <FormattedMessage {...messages.submitButton} />
                </Styled.SubmitButton>
              </Styled.ButtonContainer>
            </Styled.AllInfromationContainer>
          )
        }}
      </Formik>
      {!isEmpty(editGroupErrors) && <InformationBox fullWidth>{head(editGroupErrors)}</InformationBox>}
    </Styled.Container>
  )
}

EditGroup.propTypes = {
  intl: PropTypes.object,
  editGroupAction: PropTypes.func,
  editGroupErrors: PropTypes.array,
  editGroupLoading: PropTypes.bool,
}

EditGroup.defualtProps = {
  editGroupErrors: [],
  editGroupLoading: false,
  editGroupAction: () => {},
}

const withEditGroupMutation = Component => props => (
  <Mutation mutation={EDIT_GROUP_MUTATION}>
    {(mutate, { loading, error }) => (
      <Component
        {...props}
        editGroupAction={mutate}
        editGroupLoading={loading}
        editGroupErrors={formatGraphqlErrors(error)}
      />
    )}
  </Mutation>
)

export default compose(
  withEditGroupMutation,
  injectIntl,
)(EditGroup)
