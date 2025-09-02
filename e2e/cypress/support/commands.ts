/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to sign up a user
     * @example cy.signup('Name', 'email@example.com', '1234567890', 'Service')
     */
    signup(name: string, email: string, phone: string, service: string): Chainable<Subject>;

    /**
     * Custom command to setup an agent
     * @example cy.setupAgent('Agent Name', 'Greeting message')
     */
    setupAgent(agentName: string, greeting: string): Chainable<Subject>;
  }
}

Cypress.Commands.add("signup", (name: string, email: string, phone: string, service: string) => {
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="phone"]').type(phone);
  cy.get('input[name="service"]').type(service);
  cy.contains("Next").click();
});

Cypress.Commands.add("setupAgent", (agentName: string, greeting: string) => {
  cy.get('input[name="name"]').type(agentName);
  cy.get('input[name="greetingMsg"]').type(greeting);
  cy.contains("Next").click();
});
