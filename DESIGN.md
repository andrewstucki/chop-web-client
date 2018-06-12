# Architecture

## Technologies

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


## Layout

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

We layout our DUX files in this order:
- imports
- action types
- flow types
- action creators
- reducer
- selectors
- exports

Test code goes in the test folder. There are three main types of tests.

functional -- Testing interaction
snapshot -- Testing visual regression
unit -- Testing pure logic

The assets folder holds additional assets used by the appication.

The final code after transpiling and bundling is copied into the dist folder. The assets are also copied into dist. The dist folder is server but the production HTTP server.

## Design

CWC is built out of controls that are independant of each other. They in theroy could each live in a seprate repo and be pulled in as a dependacy and may move that way in the furture if needed.

These controls each have their over state, reducer and communicate with each other over messages (redux actions). Even those Redux has a single store each control uses a sub branch of the store for itself. They don't depend on anything another controls store. So if both controls Feed and Chat need the value of 'chatInput' and it is set with the action 'CHAT_INPUT' both Feed and Chat will have a reducer that will respond to 'CHAT_INPUT' and store the value it their own branch of the store.

Some controls dispatch actions and don't respond to them. They are letting everyone else know that this happened. Some listen to an action that they don't dispatch. Some both respond and dispatch an action. Some actions are shared and some are only used by one controls. The action is defined in the control that dispatches it, not the ones that listen to it.

Each control saves the data in the state in a format that best servers that control. So just because two controls respond to the same action doesn't mean their state is similar. For example both Feed and NavBar respond to ADD_CHANNEL and CHANGE_CHANNEL. But Feed stores the state like this:

```javascript
channels: {
  [string]: Array<MessageType>,
},
currentChannel: string,
```

And NavBar stores it like this:

```javascript
channels: Array<string>,
currentChannel: string,
```

## Layers

There are three main layers to the CWC application.

- UX
- Logic
- IO

The UX layer is the visible code and is built out of JSX and CSS. We strive to keep the UX layer as siple and logic free as possible. As much as possible JSX files should be pure functions and not classes with state. There are some excpetions where state is needed.

Logic is the Redux layer of actions, action creators and reducers. All buisness logic should go here.

The IO layer is where any network or other external related calls are made. Within the IO layer we still use reducers to respond to actions and they will often cache values in state. But their main job is to respond to actions by making external calls. There is one io reducer called dom which interacts with the dom certain ways redux doesn't normally allow. This should be avoided when you can.