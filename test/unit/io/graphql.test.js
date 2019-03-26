// @flow
import { mockRequest } from 'graphql-request';
import queries from '../../../src/io/queries';

jest.mock('graphql-request');

describe('Test GraphQL', () => {
  test('Authenticate', async () => {
    global.location = { hostname: 'digerati.chopdev.com' };

    await queries.authenticateByBasicAuth('testguy@test.com', '12345');

    expect(mockRequest).toHaveBeenCalled();
  });
});
