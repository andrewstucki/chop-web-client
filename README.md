# CWC
### (ChOP (Church Online Platform) Web Client)

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

To run all our tests (unit, func and snap). Note: for the snap tests the
Storybook server must be running.
```
yarn test
```

To run the Snapshot and Visual Regression Tests. Snapshop tests create a copy of
the markup created by React UI and compare it to the previous copy and validate
there are no differences. Visual Regession tests take a screenshot of each
componet and compare it to the last screenshot. Both of these types of tests
need the Storybook server running (see above). 
```
yarn snap
```
If there is a diffrence in the snapshots you can compare them to see the delta.
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

To run all the validation (test, flow and lint)
```
yarn validate
```

## Architecture

### Technologies

The CWC is a single page client application that runs in the browser.
It is built with many technologies but primarily based on Redux and
React. The follow resources should help you if your not familure with
any of the technologies we use.

JavaScript -- The language
https://www.ecma-international.org/ecma-262/8.0/index.html
https://developer.mozilla.org/en-US/docs/Web/JavaScript

Redux -- The core of our application, manages state and messaging
between controls and compnents.
https://redux.js.org/
https://egghead.io/courses/getting-started-with-redux

React -- Our UI library that uses JSX as a templating engine
https://reactjs.org/
https://reactjs.org/docs/introducing-jsx.html

Jest -- Our testing framework (we practice TDD)
https://facebook.github.io/jest/

Enzyme -- Helps test React UI
http://airbnb.io/enzyme/docs/api/

sinon -- Creating spies, stubs and mocks for UI testing
http://sinonjs.org/

Flow -- Static type checking for JavaScript
https://flow.org/

Webpack -- Build manager and resource bundling
https://webpack.js.org/

Babel -- JavaScript Transpiling
https://babeljs.io/

PostCSS -- CSS Transpiling
https://postcss.org/

CSSnext -- PostCSS plugin that allows us to use future CSS features
http://cssnext.io/

Storybook -- Component testing site
https://storybook.js.org/

Docker -- Container for packaging and deploying app
https://www.docker.com/

Kubernetes -- Container scaling, deployment and managment
https://kubernetes.io/
https://www.youtube.com/watch?v=4ht22ReBjno

node.js -- JavaScript environment. We mainly use it for a build and
development tool but also it runs our static server for production
https://nodejs.org/en/

yarn -- package manager (we use yarn instead of npm)
https://yarnpkg.com/en/
* please don't use npm *

nvm -- manage node versions
https://github.com/creationix/nvm

esLint -- Static analysis tool for JavaScript (linter) 
https://eslint.org/


### Layout

All our source code is in the src file. This has one index.jsx file
which is the entry point into the applicaiton. There is a components
folder and then a fold for every control.

Components are simple UI modules that have no internal state or reducer. These normally just have one JSX file and a CSS file. And example would be a button.

Controls are more complex modules that require both state and a reducer. Controls are sometimes called container components. The will have four main files

- CSS for styles
- a JSX file that renders that UI
- a dux.js file that holds all the logic; reducer, defautl state, selectors, action creators, action types.
- index.jsx which is the outword facing interface for the control and binds together the UI (*.jsx) and logic (dux.js)

Learn about the dux (or ducks) pattern
https://github.com/erikras/ducks-modular-redux


Test code goes in the test folder. There are three main types of tests.

functional -- Testing interaction
snapshot -- Testing visual regression
unit -- Testing pure logic

The assets folder holds additional assets used by the appication.

The final code after transpiling and bundling is copied into the dist folder. The assets are also copied into dist. The dist folder is server but the production HTTP server.

### Design

CWC is built out of controls that are independant of each other. They in theroy could each live in a seprate repo and be pulled in as a dependacy and may move that way in the furture if needed.

These controls each have their over state, reducer and communicate with each other over messages (redux actions). Even those Redux has a single store each control uses a sub branch of the store for itself. They don't depend on anything another controls store. So if both controls Feed and Chat need the value of 'chatInput' and it is set with the action 'CHAT_INPUT' both Feed and Chat will have a reducer that will respond to 'CHAT_INPUT' and store the value it their own branch of the store.

Some controls dispatch actions and don't respond to them. They are letting everyone else know that this happened. Some listen to an action that they don't dispatch. Some both respond and dispatch an action. Some actions are shared and some are only used by one controls. The action is defined in the control that dispatches it, not the ones that listen to it.

Each control saves the data in the state in a format that best servers that control. So just because two controls respond to the same action doesn't mean their state is similar. For example both Feed and NavBar respond to ADD_CHANNEL and CHANGE_CHANNEL. But Feed stores the state like this:

```javascript
channels: {
  [string]: {
    messages: Array<MessageType>,
    offset: number,
  }
},
currentChannel: string,
```

And NavBar stores it like this:

```javascript
channels: Array<string>,
currentChannel: string,
```