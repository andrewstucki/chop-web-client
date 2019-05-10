# Church Online Platform Web Client (CWC)

![ChOP Web Client](https://in.thewardro.be/io/opennetwork/chop-web-client/raw/master/church_online_platform_logo.png)

A Progressive Web App for experiencing church online.

## Getting Started

### Prerequisites

- nvm : https://github.com/creationix/nvm#installation
- yarn : https://yarnpkg.com/lang/en/docs/install

NOTE: We use yarn because of the added security benefits as well as other features. Because yarn using yarn.lock and npm using package.lock we need to be consistent about using the same package tool within a project.

### Installing

First install Forge https://in.thewardro.be/io/opennetwork/forge
Then use Forge to install the ChOP-WebClient by running this command:
```
cwc-install
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

## Running the tests

To run the Unit Tests.
```
yarn test
```

To run a specific Unit test.
```
yarn test -t <Name of Test>

Where <Name of Test> is replaced with the string in the describe or test function.
i.e. yarn test -t "TextField tests"
```

To have the tests watch for file changes and re-run once you've edited and saved
a file you can run the tests with the watch command.
```
yarn test --watch
```

To view code coverage.
```
yarn test:coverage
```

To run the Linter (eslint)
```
yarn lint
```

To run the Flow type-checker
```
yarn flow
```

To view the Flow coverage.
```
yarn flow:coverage
``` 

To run all the validation (test, flow and lint)
```
yarn validate
```

To run all the end-to-end tests (Cypress)
```
yarn start && yarn cy:run
```

To open the Cypress GUI
```
yarn cy:open
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

## Merge Requests

You should always work in your own branch. We follow the convention of naming our branches `<initials>/<feature-name>`.

Once your ready run `yarn validate` and make sure everything passes. Push your branch to our repository and open a merge request.

An approved merger will review your changes and either leave feedback or mark as approved for merging.

You can validate production at this URL: https://digerati.churchonline.org/host_mobile

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
