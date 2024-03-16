beforeEach(() => {
  cy.visit("/");

  cy.get("#login-form-email-input").type(Cypress.env("test_user_email"));
  cy.get("#login-form-password-input").type(Cypress.env("test_user_pwd"));
  cy.get("#login-button").click();

  cy.url().should("include", `/quizzes`);
});

describe("Quizzes", () => {
  it("are successfully retrieved from the server and displayed in the menu", () => {
    cy.visit("/quizzes");

    cy.get(".quiz-box").should("exist");
  });

  it("should take you to quiz details page when clicked on a quiz box.", () => {
    cy.visit("/quizzes");

    cy.contains(".quiz-box", Cypress.env("existing_test_quiz_title")).as(
      "specificQuizBox"
    );

    // Assert that the specific SingleQuizBox component exists
    cy.get("@specificQuizBox").should("exist");

    // Click on the specific SingleQuizBox component
    cy.get("@specificQuizBox").click();

    cy.url().should(
      "include",
      `/quizzes/${Cypress.env("existing_test_quiz_id")}`
    );
  });
});

describe("A new quiz", () => {
  it("should be created successfully", () => {
    cy.visit("/quizzes");

    cy.get(".quizzes-view-add-new-button").click();

    cy.url().should("include", "/quizzes/new");

    //Quiz info section
    cy.get("#quizTitle").type(Cypress.env("new_test_quiz_title"));
    cy.get("#create-quiz-form-action-btn").click();

    // File upload section
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/upload-test-file.pdf",
      { force: true }
    );
    cy.get("#create-quiz-form-action-btn").click();

    //Keywords section
    cy.get("#create-quiz-form-action-btn").click();

    //Instructions section
    cy.get("#create-quiz-form-action-btn").click();

    //Quiz should be created
    cy.get("#quiz-details-view-container", { timeout: 30000 }).should("exist");
  });

  it("should be deleted successfully", () => {
    cy.visit("/quizzes");

    cy.contains(".quiz-box", Cypress.env("new_test_quiz_title")).as(
      "specificQuizBox"
    );

    // Assert that the specific SingleQuizBox component exists
    cy.get("@specificQuizBox").should("exist");

    // Click on the specific SingleQuizBox component
    cy.get("@specificQuizBox").click();

    cy.get("#delete-quiz-btn").click();

    //Delete and redirect successful
    cy.url().should("contain", "/quizzes");
  });
});
