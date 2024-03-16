describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");

    cy.get("#login-form-email-input").type(Cypress.env("test_user_email"));
    cy.get("#login-form-password-input").type(Cypress.env("test_user_pwd"));

    cy.get("#login-button").click();

    cy.url().should("include", "/quizzes");
  });
});
