/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill'

// Import all the third party stuff
import React from 'react'
// import FontFaceObserver from 'fontfaceobserver'
import ReactDOM from 'react-dom'
// import get from 'lodash/get'

// import { ApolloClient } from 'apollo-client'
// import { ApolloProvider } from 'react-apollo'
import { ConnectedRouter } from 'connected-react-router'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { setContext } from 'apollo-link-context'

import { Provider } from 'react-redux'
// import { createUploadLink } from 'apollo-upload-client'

// Import root app
import App from 'containers/App'

// Import local storage
// import EFClocalStorage from 'utils/localStorage'

// Import BaseUrl
// import baseCleanURL from 'lib/ApiUrl'

// Import history
import history from 'utils/history'

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider'

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
import 'file-loader?name=.htaccess!./.htaccess' // eslint-disable-line import/extensions

import configureStore from './configureStore'

// Import CSS reset and Global Styles
import GlobaStyles from './global-styles'

// Import i18n messages
import { translationMessages } from './i18n'
// Observe loading of Poppins (to remove Poppins, remove the <link> tag in
// the index.html file and this observer)
// const openSansObserver = new FontFaceObserver('Poppins', {})

// When Poppins is loaded, add a font-family using Poppins to the body
// openSansObserver.load().then(() => {
//   document.body.classList.add('fontLoaded')
// })

// Create redux store with history
const initialState = {}
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app')

// Apollo client config
// const authLink = setContext((_, { headers }) => {
//   const storedUser = EFClocalStorage.getSession()

//   return {
//     headers: {
//       ...headers,
//       uid: get(storedUser, 'token.uid'),
//       'access-token': get(storedUser, 'token.accessToken'),
//       client: get(storedUser, 'token.client'),
//     },
//     uri: `https://${baseCleanURL}/${get(storedUser, 'role', '')}`,
//   }
// })

// const apolloClient = new ApolloClient({
//   link: authLink.concat(
//     createUploadLink({
//       uri: ``,
//     }),
//   ),
//   cache: new InMemoryCache(),
// })

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <GlobaStyles />
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            {/* {<ApolloProvider client={apolloClient}>} */}
            <App store={store} />
            {/* {</ApolloProvider>} */}
          </ConnectedRouter>
        </LanguageProvider>
      </div>
    </Provider>,
    MOUNT_NODE,
  )
}

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'))
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')])) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}
