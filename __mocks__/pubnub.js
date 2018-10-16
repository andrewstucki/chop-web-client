let listeners = {};

export const mockSubscribe = jest.fn();
export const mockUnsubscribe = jest.fn();
export const mockAddListener = jest.fn().mockImplementation(obj => {
  listeners = obj;
});
export const mockPublish = jest.fn();
export const mockSetState = jest.fn();

const __subscribeEvent = event => {
  if (typeof listeners.status === 'function') {
    listeners.status(event);
  }
};

const __messageEvent = event => {
  if (typeof listeners.message === 'function') {
    listeners.message(event);
  }
};

export {
  __subscribeEvent,
  __messageEvent,
};

const mock = jest.fn().mockImplementation(() => (
  {
    subscribe: mockSubscribe,
    unsubscribe: mockUnsubscribe,
    addListener: mockAddListener,
    publish: mockPublish,
    setState: mockSetState,
  }
));

export default mock;