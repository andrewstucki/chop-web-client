const graphqlJs = jest.fn();
const graph = jest.fn();
const promiseFunction = jest.fn();

let fakeData = {};

graphqlJs.__setFakeData = data => {
  fakeData = data;
};

const then = callback => {
  callback(fakeData);
};

const promise = {
  then: then,
};

graphqlJs.mockReturnValue(graph);
graph.mockReturnValue(promiseFunction);
promiseFunction.mockReturnValue(promise);


export default graphqlJs;
