# Architecture

## Technologies

The CWC is a single page client application that runs in the browser.
It is built with many technologies but primarily based on Redux and
React. The following resources should help you if you're not familiar with
any of the technologies we use.

JavaScript -- The language
https://www.ecma-international.org/ecma-262/8.0/index.html
https://developer.mozilla.org/en-US/docs/Web/JavaScript

Redux -- The core of our application, manages state and messaging
between controls and components.
https://redux.js.org/
https://egghead.io/courses/getting-started-with-redux

Redux Saga -- Middleware that handles async side effects
https://redux-saga.js.org/

React -- Our UI library that uses JSX as a templating engine
https://reactjs.org/
https://reactjs.org/docs/introducing-jsx.html

Jest -- Our testing framework (we practice TDD)
https://facebook.github.io/jest/

React Testing Library -- Helps test React UI
https://github.com/testing-library/react-testing-library

sinon -- Creating spies, stubs and mocks for UI testing
http://sinonjs.org/

Flow -- Static type checking for JavaScript
https://flow.org/

Webpack -- Build manager and resource bundling
https://webpack.js.org/

Babel -- JavaScript Transpiling
https://babeljs.io/

Styled Components -- CSS in JS
https://www.styled-components.com/

GitLab CI/CD -- Continues Integration and Deployment
https://about.gitlab.com/features/gitlab-ci-cd/

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
which is the entry point into the application. There is a components
folder for shared components and then a folder for every control.

Components are simple UI modules that have no internal state or reducer. These normally just have one JSX file and styling. An example would be a button.

Controls are more complex modules that require access to state and often have type definitions defined in a separate file. Controls are sometimes called container components. They will have four main files

- Styled Components (`styles.js`)
- a JSX file that renders that UI
- a dux.js file that holds selectors, action creators, flow type definitions, and action types.
- index.js which is the outward facing interface for the control and binds together the UI (*.jsx), global state (Redux), and logic (dux.js)

Learn about the dux (or ducks) pattern
https://github.com/erikras/ducks-modular-redux

We layout our DUX files in this order:
- imports
- action types
- flow types
- action creators
- selectors
- exports

Test code goes in the test folder. There are three main types of tests.

- functional -- Testing interaction
- unit -- Testing pure logic

The assets folder holds additional static assets used by the application (images, audio).

The final code after transpiling and bundling is copied into the dist folder. The assets are also copied into dist. The dist folder is served by the production HTTP server.

## Design

CWC is built out of controls that are independent of each other. They in theory could each live in a separate repo and be pulled in as a dependency and may move that way in the future if needed.

These controls each have access to the state (also called store in some cases) and communicate with each other over messages (redux actions). Even though Redux has a single store, each control can utilize it's own part of state if the need arises.

We currently separate most action creators according to the module that they are updating. For example we have a "chat" module that has a setChatFocus action creator that updates a boolean when the chat component is focused or blurred. The action creator is defined in the chat dux.js file, but we listen for the the SET_CHAT_FOCUS type in the reducer and update state accordingly.

The action types and flow type definitions are usually defined in the same file as the action creator that they are defining. Sometimes we also need to define what a piece of state looks like as well and those definitions live in the reducer dux file (currently inside src/feed/dux.js).

Not all action creators are stored like this. Some are stored in the same dux file as the reducer itself. As CWC grows we learn new and better ways to organize where we store state, action creators, type definitions, etc. This is a pattern that we're still defining and could change in the near future.

## Layers

There are three main layers to the CWC application.

- UX
- Logic
- IO

The UX layer is the visible code and is built out of JSX and CSS. We strive to keep the UX layer as simple and logic free as possible. As much as possible JSX files should be functional components that utilize Hooks when needed. There are some exceptions allowed if a class based component needs to be used. Consult with a maintainer before going down that route.

Logic is the Redux layer of actions, action creators and reducers. All business logic should go here.

The IO layer is where any network or other external related calls are made. Within the IO layer we utilize Redux Saga to respond to actions and they will often cache values in state, but their main job is to respond to actions by making external calls.

## The Feed and Moments

The Feed and Moments are one of the core features of CWC. The Feed is an area that can display a list of Moments in order. Moments are any small piece of UI that can go into the Feed. That sounds a little abstract so here are some examples:

- A Chat Message is a Moment and if the only thing in the Feed is Chat Messages then you may start to think of the Feed as the message display of the Chat.
- Notifications can be Moments when displayed inline in the Feed.
- Invitations to Give, for Prayer, to Raise your hand signaling you would like to receive Christ as your savior, all can be types of Moments.

Think of the Feed as a scrolling, ordered list of bits of information and Moments are those bits of information.

A Moment has one property `data`. The `data` prop has the required parameter `type`. The `type` parameter defines the type of Moment it is. This is a similar pattern Redux uses for Actions in the reducer. Each action has a type which tells the reducer how to handle it. For Moments, each one has a type which tells the Moment JSX which component to render.

To build a new Moment type:

- Create a new sub-directory here: https://in.thewardro.be/io/opennetwork/chop-web-client/tree/master/src/moment. Name it after your new moment type. This is where you'll put all the files related to it.
- Moments types will often have a dux and index file along with the JSX file. But they don't need a reducer unless there is some state you want to track that applies to all Moments of that type.
- Add your new type here: https://in.thewardro.be/io/opennetwork/chop-web-client/blob/master/src/moment/moment.jsx updating the switch statement to render it correctly.
- Expose any selectors and the main component in moment/index

Don't forget to write all the necessary tests and add to the moment story.

You'll also need to make a new action creator. You can use the action types:

- PUBLISH_MOMENT_TO_CHANNEL - to add a moment to a channel and publish it across the WebSocket
- RECEIVE_MOMENT - when you receive a moment over the WebSocket and need to act on it
