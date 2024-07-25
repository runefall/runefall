describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");

  it("This checks to make sure the about page displays properly", () => {
    cy.visit("/about");

    cy.get("header").should("exist");
    cy.get("footer").should("exist");

    cy.getTestId("about-title").contains(
      "Runefall ABOUT PAGE",
    );

    cy.getTestId("about-runefall").contains(
      "Runefall is an advanced card search tool designed for the",
    );

    cy.getTestId("about-why").contains(
      "Runefall was designed primarily designed as a project for graduation by students",
    );

    cy.getTestId("about-tech").contains(
      "Runefall was built using TypeScript and React components.",
    );

    cy.getTestId("contributors").contains(
      "Who are we?",
    );

    // some misc tests for the header
    cy.getTestId("nav-logo").click();
    cy.url().should("eq", `${baseUrl}/`);
  });
});
