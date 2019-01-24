/// <reference types="cypress" />
// this adds custom jest matchers from jest-dom
describe("new game", () => {
  it('should be accessible from /game', () => {
    cy.visit('/');
    cy.getByText(/Nouvelle partie/i).click();
    cy.queryAllByTestId("picked").should("be.empty");
    cy.getByText("42").click();
    cy.getByText("29").click();
    cy.getByText("90").click();
    cy.getAllByTestId('picked').should('have.length', 6);
    cy.getByText(/fin de partie/i).click();
    cy.url().should('eq', Cypress.config().baseUrl + "/");
  })
});