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
  cy.visit("http://localhost:3000/login");
  cy.intercept({
    method: "POST",
    url: `${API.LOGIN}`,
  });
  cy.intercept("GET", "/_next/data/development/index.json", {
    fixture: "products.json",
  });
  cy.contains("이메일 주소")
    .parent()
    .type(`${Cypress.env("CYPRESS_TEST_EMAIL")}`);
  cy.contains("비밀번호")
    .parent()
    .type(`${Cypress.env("CYPRESS_TEST_PASSWORD")}`);
  cy.contains("로그인").click();
  cy.contains("하루 동안 보지 않기").click();
});
