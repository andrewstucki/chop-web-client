// Cypress.Commands.add('visitGraphQL', (url, operations = {}) => {
//   cy.visit(url, {
//     onBeforeLoad: (win) => {
//       cy.stub(win, 'fetch').callsFake(serverStub);
//     }
//   });

//   function serverStub(path, req) {
//     const { operationName } = JSON.parse(req);

//     if (operationName in operations) {
//       return Promise.resolve(responseStub(operations[operationName]));
//     }

//     return Promise.reject(new Error(`Not found: ${path}`));
//   }

//   function responseStub(result) {
//     return {
//       json() {
//         return Promise.resolve(result);
//       },
//       text() {
//         return Promise.resolve(JSON.stringify(result));
//       },
//       ok: true,
//     }
//   }
// });

// beforeEach(() => {
//   cy.server();

//   cy.fixture('currnetEvent.json').as('currentEvent');

//   cy.visitGraphQL('/graphql', {
//     CurrentEvent: cy.get('@currentEvent')
//   })
// })