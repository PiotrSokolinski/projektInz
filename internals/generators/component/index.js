/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const { STATELESS_FUNCTION_TYPE_NAME, ES6_CLASS_TYPE_NAME } = require('../utils/constants')
const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: STATELESS_FUNCTION_TYPE_NAME,
      choices: () => [STATELESS_FUNCTION_TYPE_NAME, ES6_CLASS_TYPE_NAME]
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if(/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            :true;
        }
        return 'The name is required';
      },
    },
    {
      choices: () => ['PureComponent','Component'],
      default: 'PureComponent',
      message: 'Select a base component:',
      name: 'component',
      type: 'list',
      when: ({type}) => type === ES6_CLASS_TYPE_NAME,
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    let templateFile;
    switch(data.type) {
      case ES6_CLASS_TYPE_NAME: {
        templateFile='./component/es6.js.hbs';
        break;
      }
      default:
      case STATELESS_FUNCTION_TYPE_NAME: {
        templateFile='./component/index.js.hbs';
        break;
      }
    }
    const actions=[
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/index.js',
        templateFile,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/tests/index.test.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
    ];
    // If the user wants i18n messages
    if(data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/messages.js',
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }
    // If the user wants Loadable.js to load the component asynchronously
    if(data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }
    actions.push({
      type: 'prettify',
      path: '/components/',
    });
    return actions;
  }
}
