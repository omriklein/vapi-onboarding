describe("Verifty got email today", () => {
  beforeEach(() => {
    // Ignore any uncaught exceptions on the mailinator page
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("should complete signup and agent setup", () => {

    cy.visit("https://www.mailinator.com/");

    cy.contains("Public Inbox").should("be.visible");

    const email = "vapitest@mailinator.com"; // TODO: Change to take from env file
    cy.get('input#search').type(email);
    cy.contains("GO").click();

    cy.contains("VAPI Obnoarding").click();
    cy.get("#html_msg_body").should("be.visible");
  });
});
