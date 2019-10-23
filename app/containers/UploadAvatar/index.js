/**
 *
 * UploadAvatar
 *
 */

import React, { useRef } from 'react'
import Dropzone from 'react-dropzone'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
// import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

import UserAvatar from 'components/UserAvatar'

import messages from './messages'
import * as Styled from './styled'

const UploadAvatar = (/* { history } */) => {
  const dropzoneRef = useRef(null)
  const onUploadButtonClick = () => {
    dropzoneRef.current.open()
  }

  const onSaveButtonClick = () /* async files */ => {
    // const result = await assignAvatar({
    //   variables: {
    //     avatar: head(files),
    //   },
    // })
    // const avatarUrl = get(result, 'data.assignAvatar.avatarUrl')
    // if (avatarUrl) {
    //   updateAvatarUrl(avatarUrl)
    //   history.push('/')
    // }
  }

  const preparePreviewForUploadedImage = files => {
    const uploadedFile = head(files)

    if (!isEmpty(uploadedFile)) {
      return window.URL.createObjectURL(uploadedFile)
    }
    return null
  }
  return (
    <Styled.Wrapper>
      <Styled.Container>
        <Styled.Header>
          <FormattedMessage {...messages.header} />
        </Styled.Header>
        <Dropzone accept="image/*" multiple={false} ref={dropzoneRef}>
          {({ acceptedFiles, getInputProps }) => (
            <>
              <input {...getInputProps()} />
              <Styled.Avatar>
                <UserAvatar size="large" image={preparePreviewForUploadedImage(acceptedFiles)} />
              </Styled.Avatar>
              <Styled.ButtonsContainer>
                <Styled.Button onClick={onUploadButtonClick}>
                  <FormattedMessage {...messages[isEmpty(acceptedFiles) ? 'uploadPhoto' : 'changePhoto']} />
                </Styled.Button>
                {!isEmpty(acceptedFiles) && (
                  <Styled.Button onClick={() => onSaveButtonClick(acceptedFiles)}>
                    <FormattedMessage {...messages.save} />
                  </Styled.Button>
                )}
              </Styled.ButtonsContainer>
            </>
          )}
        </Dropzone>
        <Styled.SkipLink to="/">
          <FormattedMessage {...messages.skip} />
        </Styled.SkipLink>
      </Styled.Container>
    </Styled.Wrapper>
  )
}

UploadAvatar.propTypes = {}

export default injectIntl(UploadAvatar)
