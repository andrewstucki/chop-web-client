# Church Online Platform (ChOP) web client

## Installing

### Install `nvm`
Go to this URL and follow the instructions
https://github.com/creationix/nvm#installation

### Install the correft version of `node`
After verifying run this command to install the version of node.js specificed in the .nvmrc file:
```bash
nvm install $(cat .nvmrc)
```
Or if you've already install that version
```bash
nvm use $(cat .nvmrc)
```

### Install `yarn`
Go to this URL and follow the
https://yarnpkg.com/en/docs/install

Because yarn using yarn.lock and npm using package.lock we need to be consistent
about using the same package tool within a project. We use yarn because of the
added security benifits as well as other features.

### Install packages
Run the following command to install the remaining node packages.
```
yarn
```

## Production Build

To build code to the dist folder ready for production use:
```
yarn run build
```

## Local Development

To start the server locally in development mode use:
```
yarn start
```

To start the Storybook server to view components.
```
yarn storybook
```

## Run Tests

To run the Uint Tests. Unit tests validate code logic without
interactive with UI.
```
yarn run test:unit
```

To run the Functional Tests. Functional tests validate state and
behaviour of React UI.
```
yarn run test:func
```

To run the Snapshot and Visual Regression Tests. Snapshop tests create a copy of
the markup created by React UI and compare it to the previous copy and validate
there are no differences. Visual Regession tests take a screenshot of each
componet and compare it to the last screenshot. Both of these types of tests
need the Storybook server running (see above). 
```
yarn run test:snap
```

To run all our tests (unit, func and snap). Note: for the snap tests the
Storybook server must be running.
```
yarn run test
```

To run the Linter (eslint)
```
yarn run test:lint
```

To run the Flow type-checker
```
yarn run test:flow
```

To run all the validation (test, flow and lint)
```
yarn run test:validate
```