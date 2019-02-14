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
folder and then a folder for every control.

Components are simple UI modules that have no internal state or reducer. These normally just have one JSX file and a CSS file. An example would be a button.

Controls are more complex modules that require access to state and often have type definitions defined in a separate file. Controls are sometimes called container components. They will have four main files

- CSS for styles
- a JSX file that renders that UI
- a dux.js file that holds selectors, action creators, flow type definitions, and action types.
- index.js which is the outward facing interface for the control and binds together the UI (*.jsx) and logic (dux.js)

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

The assets folder holds additional assets used by the application.

The final code after transpiling and bundling is copied into the dist folder. The assets are also copied into dist. The dist folder is server but the production HTTP server.

## Design

CWC is built out of controls that are independent of each other. They in theory could each live in a separate repo and be pulled in as a dependency and may move that way in the future if needed.

These controls each have access to the state (also called store in some cases) and communicate with each other over messages (redux actions). Even though Redux has a single store, each control can utilize it's own part of state if the need arises, but currently we have one reducer that holds all of our state.

We currently separate most action creators according to the module that they are updating. For example we have a "chat" module that has a toggleChatFocus action creator that updates a boolean when the chat component is focused or blurred. The action creator is defined in the chat dux.js file, but we listen for the the TOGGLE_CHAT_FOCUS type in the reducer and update state accordingly.

The action types and flow type definitions are usually defined in the same file as the action creator that they are defining. Sometimes we also need to define what a piece of state looks like as well and those definitions live in the reducer dux file (currently inside src/feed/dux.js).

Not all action creators are stored like this. Some are stored in the same dux file as the reducer itself. As CWC grows we learn new and better ways to organize where we store state, action creators, type definitions, etc. This is a pattern that we're still defining and could change in the near future.

## Layers

There are three main layers to the CWC application.

- UX
- Logic
- IO

The UX layer is the visible code and is built out of JSX and CSS. We strive to keep the UX layer as simple and logic free as possible. As much as possible JSX files should be pure functions and not classes with state. There are some exceptions where state is needed.

Logic is the Redux layer of actions, action creators and reducers. All business logic should go here.

The IO layer is where any network or other external related calls are made. Within the IO layer we still use reducers to respond to actions and they will often cache values in state, but their main job is to respond to actions by making external calls. There is one io reducer called dom which interacts with the dom certain ways redux doesn't normally allow. This should be avoided when you can.

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

## Middleware

You don’t have to fully understand middleware to understand what’s going on here. Take a look at this function:
https://in.thewardro.be/io/opennetwork/chop-web-client/merge_requests/106/diffs#6115dd4c7eebef5a7a766c3308a5ccf11274db46_0_64
```
dispatch (action: any) {
  if (!action && !action.type) {
    return;
  }
  switch (action.type) {
  case 'GET_INIT_DATA':
    this.getInitialData();
    return;
  default:
    return;
  }
}
```
They way the middleware is set up any time you dispatch an action this dispatch function is called. Maybe it needs a better name because it’s not dispatching anything, it’s receiving an action. It has a switch statement just like any other reducer. 
There are two big differences between this function and a reducer. 
1. Reducers are “pure” functions (take time to read this: https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976). While the actors are designed to cause side effects.
2. Reducers cannot dispatch another action (Redux will throw an error if you try). Once they are done performing their side effect or async action, actors are designed to dispatch another action.
You can see #2 here when it calls this.storeDispatch (which is just the redux dispatch function): https://in.thewardro.be/io/opennetwork/chop-web-client/merge_requests/106/diffs#6115dd4c7eebef5a7a766c3308a5ccf11274db46_0_54
```
getInitialData () {
  this.getAll()
    .then(data => {
      this.storeDispatch({
        type: 'SET_INIT_DATA',
        data: data.data,
      });
    });
}
```
The flow in this bit of code goes like this:
1. We dispatch an action: `dispatch({type:'GET_INIT_DATA'})`
2. All the reducers AND all the middleware are called with that action
3. Our GraphQlActor.dispatch function is called with the action
4. the switch statement matching the action.type and calls `this.getInitialData();`
5. `getInitialData` is called and calls `this.getAll()` which returns a `Promise` (in case you need a refresher: https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
6. `getAll` calls the server and asks for a bunch of information about our app (video URL, user, channels, etc…)
7. When the data comes back the `Promise` resolves with `.then`
8. this.storeDispatch is just the redux `dispatch` function so we dispatch the action
```
{
  type: 'SET_INIT_DATA',
  data: {...} // lots of data
}
```
9. Again all the reducers AND middleware are called with that action
10. the reducer will have that action added and apply this data to the store
Notice we do an async side effect between receiving the action and dispatching a new action. In this case it’s an HTTP call to the server like calling `fetch`. And we dispatch a new action when we are done. The two things reducers are not allowed to do. But other than that the actors are just like reducers in that they listen to and respond to dispatched actions.

Actors (the actor model) is a real thing I’m borrowing the name from (https://www.brianstorti.com/the-actor-model/). A little bit harder to understand but basically a `Actors` are objects that communicate by ‘sending messages’ to each other (in our case read ‘dispatching actions’).

In a real Actor Model setup The Actors are synchronous and the messages are sent (actions are dispatched) asynchronously. For us Redux dispatch actions synchronously and our actors primarily do asynchronous tasks. So it’s backwards, but the idea is similar.
If all of that doesn’t make sense don’t worry about it, it’s not important. Just know I borrowed the name from a real concept.
