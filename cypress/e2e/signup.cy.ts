describe("Signup functionality", () => {
  it.only("should work", () => {
    cy.visit("/signup");

    cy.get('[data-testid="signup-form-email-input"]').type(
      Cypress.env("signup_user_email")
    );
    cy.get('[data-testid="signup-form-pwd-input"]').type(
      Cypress.env("signup_user_pwd")
    );
    cy.get('[data-testid="signup-form-pwd-repeat-input"]').type(
      Cypress.env("signup_user_pwd")
    );

    cy.get("#signup-button").click();

    cy.url({ timeout: 30000 }).should("include", "/login");

    cy.get('[data-testid="login-form-email-input"]').type(
      Cypress.env("signup_user_email")
    );
    cy.get('[data-testid="login-form-password-input"]').type(
      Cypress.env("signup_user_pwd")
    );

    cy.get('[data-testid="login-button"]').click();

    cy.url().should("include", "/quizzes");

    // Clear data after test
    // cy.request("DELETE", `${Cypress.env("api_url")}/cypress-user`); // uncomment when testing locally
    cy.request("DELETE", `${Cypress.env("prod_api_url")}/cypress-user`);
  });
});
