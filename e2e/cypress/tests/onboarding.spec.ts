describe("VAPI Onboarding Flow", () => {
  it("should complete signup and agent setup", () => {
    cy.visit("/");

    cy.signup("Test User", "test@example.com", "0543455365", "Test Service");

    cy.setupAgent("Test Agent", "Hello, I am your assistant!");

    cy.contains("Summary").should("be.visible");
    cy.contains("Test Agent").should("exist");
    
    cy.contains("Finish").click();

    cy.contains("Success!").should("exist");
  });
});
