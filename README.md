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
yarn build
```

To start the production server run
```
yarn server
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
yarn test:unit
```

To run the Functional Tests. Functional tests validate state and
behaviour of React UI.
```
yarn test:func
```

To run a specific Unit or Functional test.
```
yarn test -t <Name of Test>
```
Where <Name of Test> is replaced with the string in the describe or test function.
i.e.
```
yarn -t "TextField tests"
```

To have the tests watch for file changes and re-run once you've edited and saved
a file you can run the tests with the watch command.
```
yarn test --watch
```
or
```
yarn test:unit --watch
```
or
```
yarn test:func --watch
```

To run the Snapshot and Visual Regression Tests. Snapshop tests create a copy of
the markup created by React UI and compare it to the previous copy and validate
there are no differences. Visual Regession tests take a screenshot of each
componet and compare it to the last screenshot. Both of these types of tests
need the Storybook server running (see above). 
```
yarn test:snap
```
If there is a diffrence in the snapshots you can compare them to see the delta.
Then if it is a bug fix it, or if it is an accepted change you can update the
saved snapshots to reflect the new state.
```
yarn test:snap -u
```

To run all our tests (unit, func and snap). Note: for the snap tests the
Storybook server must be running.
```
yarn test
```

To run the Linter (eslint)
```
yarn lint
```

To run the Flow type-checker
```
yarn flow
```

To run all the validation (test, flow and lint)
```
yarn validate
```