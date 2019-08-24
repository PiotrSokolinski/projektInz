# Documentation


## Development

To download all dependencies run `yarn install`. Run `yarn start` to see your app at `localhost:3000`.

## Building

Run `yarn build`, which will compile all the necessary files to the `build` folder.

## Testing

### Unit Testing
1.  Put `.test.js` files directly next to the parts of your application you
    want to test. (Or in `test/` subdirectories, it doesn't really matter as long
    as they are directly next to those parts and end in `.test.js`)

1.  Run `yarn test` in your terminal and see all the tests pass! (hopefully)

### End to End Testing
1. Put `.spec.js` files in `cypress/integration` folder

1. Run `yarn cypress:open` to run cypress tests

## Storybook
1. Add stories to `app/stories` folder and update `.storybook/config.js` file
1. Run `yarn storybook` to open a new window with storybooks
