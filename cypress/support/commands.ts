/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import API from "../../src/api/config";

Cypress.Commands.add("login", () => {
  cy.request({
    url: `${API.LOGIN}`,
    method: "POST",
    body: {
      email: `${Cypress.env("CYPRESS_TEST_EMAIL")}`,
      password: `${Cypress.env("CYPRESS_TEST_PASSWORD")}`,
    },
  })
    .its("headers")
    .then((response) => {
      localStorage.setItem(
        "accessToken",
        // @ts-expect-error 이 부분은 의도적으로 에러를 억제하기 위해 사용되었습니다.
        `${response.authorization.replace("Bearer ", "")}`,
      );
    });
});
