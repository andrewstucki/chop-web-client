# CWC -- ChOP (Church Online Platform) Web Client

A Progressive Web App for experiencing church online.

## Getting Started

### Prerequisites

- nvm : https://github.com/creationix/nvm#installation
- yarn : https://yarnpkg.com/lang/en/docs/install

NOTE: We use yarn because of the added security benefits as well as other features. Because yarn using yarn.lock and npm using package.lock we need to be consistent about using the same package tool within a project.

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

The first thing that happens when CWC starts up is it uses a cookie a token in a
cookie to authenticate you as a user and load needed data to run. Locally you
will not have that cookie so you will have to copy if from
http://digerati.churchonline.org/. 
Go to http://digerati.churchonline.org/ and sign in. If you don't have an account
you will have to create one and ask one of the current admins to make you an admin.
Once signed in go to http://digerati.churchonline.org/host_mobile.
You have to copy the legacy_token cookie from this domain into your localhost 
domain for it to work with the service.

1. Open the dev tools
2. Then go to the application tab (I'm assuming your using Chrome)
3. Under Cookies > http://digerati.churchonline.org/host_mobile
4. Copy the 'legacy_token' cookie value
5. go to your http://localhost:8080
6. Add the cookie (under application tab) 'legacy_token' with the value you copied
7. refresh the page

To start the Storybook server to view components.
```
yarn storybook
```

## Running the tests

To run the Unit Tests. Unit tests validate code logic without
interactive with UI.
```
yarn test
```

To run the Functional Tests. Functional tests validate state and behavior of React UI. NOTE: these tests will only pass if you are **running the server locally** in another terminal window with `yarn start`.
```
yarn functional
```

To run a specific Unit or Functional test.
```
yarn test -t <Name of Test>
```
or
```
yarn functional -t <Name of Test>
```
Where <Name of Test> is replaced with the string in the describe or test function.
i.e.
```
yarn test -t "TextField tests"
```

To have the tests watch for file changes and re-run once you've edited and saved
a file you can run the tests with the watch command.
```
yarn test --watch
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
need the Storybook server running (see above) in another terminal window (`yarn storybook`).
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

To run all the validation (test, functional, snap, flow and lint)
```
yarn validate
```

Remember, the functional tests will only work if you have first run `yarn start` and `yarn storybook` in other terminal windows.

## Production Build

To build code to the dist folder ready for production use:
```
yarn build
```

To start the production server run
```
yarn server
```

## Merge Requests

You should always work in your own branch. We follow the convention of naming our branches `<initials>/<feature-name>`. So a branch where I'm (Kenny Heaton) developing a feature to add login might be called `kh/add-login`. You can also add the JIRA ticket `kh/add-login_CHOP-1234`.

Once your ready run `yarn validate` and make sure everything passes. Push your branch to our repository on GitLab (git@in.thewardro.be:io/opennetwork/chop-web-client.git) and open a merge request.

An approved merger will review your changes and either leave feedback or mark as approved for merging. Once approved you should mere your own change and insure the the CI/CD pipeline passes (https://in.thewardro.be/io/opennetwork/chop-web-client/pipelines) and your changes are deployed correctly and everything works in production.

You can validate production at this URL: https://cwc-chopapi.global.ssl.fastly.net/

## Deployment

Changes merged into master are automatically merged and deployed by our CI/CD pipeline. This is done with GitLab CI/CD.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://in.thewardro.be/io/opennetwork/chop-web-client/tags). 

## Authors

See also the list of [maintainers](MAINTAINERS) who participated n this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
