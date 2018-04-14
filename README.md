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

## Run Tests

To run the Uint Tests
```
yarn run test
```