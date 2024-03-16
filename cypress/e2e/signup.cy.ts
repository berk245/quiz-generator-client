describe("template spec", () => {
  it("passes", () => {
    cy.visit("/signup");

    cy.get("#signup-form-email-input").type(Cypress.env("signup_user_email"));
    cy.get("#signup-form-pwd-input").type(Cypress.env("signup_user_pwd"));
    cy.get("#signup-form-pwd-repeat-input").type(
      Cypress.env("signup_user_pwd")
    );

    cy.get("#signup-button").click();

    cy.url().should("include", "/login");

    cy.get("#login-form-email-input").type(Cypress.env("signup_user_email"));
    cy.get("#login-form-password-input").type(Cypress.env("signup_user_pwd"));

    cy.get("#login-button").click();

    cy.url().should("include", "/quizzes");

    // Clear data after test
    cy.request("DELETE", "http://127.0.0.1:8000/cypress-user");
  });
});
