describe("Login", () => {
  it("should log the user in", () => {
    cy.visit("/");

    cy.get('[data-testid="login-form-email-input"]').type(
      Cypress.env("test_user_email")
    );
    cy.get('[data-testid="login-form-password-input"]').type(
      Cypress.env("test_user_pwd")
    );

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/dashboard");
  });
});
