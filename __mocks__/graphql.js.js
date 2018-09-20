const mockGraphqlJs = jest.fn();
const mockGraph = jest.fn();
const mockFetch = jest.fn();

mockGraphqlJs.mockReturnValue(mockGraph);
mockGraph.mockReturnValue(mockFetch);
mockFetch.mockResolvedValue({});


export default mockGraphqlJs;

export {
  mockGraph,
  mockFetch,
};
