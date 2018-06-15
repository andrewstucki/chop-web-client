# CWC -- ChOP (Church Online Platform) Web Client

A Progressive Web App for experiencing church online.

## Getting Started

### Prerequisites

- nvm : https://github.com/creationix/nvm#installation
- yarn : https://yarnpkg.com/lang/en/docs/install

NOTE: We use yarn because of the added security benefits as well as other features. Because yarn using yarn.lock and npm using package.lock we need to be consistent about using the same package tool within a project.

If you are going to deploy production releases you will also need these to install the following. You will need to have permissions to our GKE project as well.

- docker : https://www.docker.com/community-edition#/download
- gcloud : https://cloud.google.com/sdk/install
- kubectl : run `gcloud components install kubectl`
- setup gcloud :
  - `gcloud config set project open-network-194320`
  - `gcloud container clusters get-credentials chop-web-client`
  - `gcloud auth configure-docker`

### Installing

In order to ensure that you have the correct version of node installed use nvm to match our .nvmrc file. Our tests will not work with the latest version of node. We use the Node LTS (Long Term Support which is 8.11.2 as of the time of this writing) version. From withing the project directory run:

```bash
nvm install
```

Once installed you will need to tell nvm to use that version each time you open a new terminal in the cwc project.

```bash
nvm use
```

You can see what version you have with

```
nvm version
```

Run yarn to install the remaining node packages.

```
yarn
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

## Running the tests

To run the Unit Tests. Unit tests validate code logic without
interactive with UI.
```
yarn test:unit
```

To run the Functional Tests. Functional tests validate state and
behavior of React UI.
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

To run all our tests (unit, func and snap). Note: for the snap tests the
Storybook server must be running.
```
yarn test
```

To view code coverage.
```
yarn coverage
```

To generate updated code quality and complexity report
```
yarn plato
```

To run the Snapshot and Visual Regression Tests. Snapshot tests create a copy of
the markup created by React UI and compare it to the previous copy and validate
there are no differences. Visual Regression tests take a screenshot of each
component and compare it to the last screenshot. Both of these types of tests
need the Storybook server running (see above). 
```
yarn snap
```
If there is a difference in the snapshots you can compare them to see the delta.
Then if it is a bug fix it, or if it is an accepted change you can update the
saved snapshots to reflect the new state.
```
yarn snap -u
```

To run the Linter (eslint)
```
yarn lint
```

To run the Flow type-checker
```
yarn flow
```

To run all the validation (test, snap, flow and lint)
```
yarn validate
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

## Deployment

Before deploying you will need permissions to our GKE project and to install the deployment prerequisites.

Update the version in the project.json and config/deployment.yaml files as well as set the git tag.

You can update the package.json and the git tag together.

```
yarn version --minor
```

NOTE: Until we reach MVP we are leaving the major version 0 and just updating the minor version. We are doing this because almost ever release has breaking changes. Once we reach MVP we will be at 1.0.0 and will follow strict semantic versioning form that point on.

You will have to manually update the tag on config/deployment.yaml on this line to match the new version.

```
image: gcr.io/open-network-194320/chop-web-client:0.13.0
```

Build your docker container replacing <version> with the correct version:

```
docker build -f config/Dockerfile -t gcr.io/open-network-194320/chop-web-client:<version> .
```

Push the container to Google's Container Registry

```
docker push gcr.io/open-network-194320/chop-web-client:<version>
```

Deploy the  new container to GKE

```
kubectl apply -f config/deployment.yaml
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://in.thewardro.be/io/opennetwork/chop-web-client/tags). 

## Authors

See also the list of [maintainers](MAINTAINERS) who participated n this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
