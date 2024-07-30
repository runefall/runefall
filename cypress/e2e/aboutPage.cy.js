describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");

  it("This checks to make sure the about page displays properly", () => {
    cy.visit("/about");

    cy.get("header").should("exist");
    cy.get("footer").should("exist");

    cy.getTestId("about-title").should("have.length", 1);
    cy.getTestId("about-runefall").should("have.length", 1);
    cy.getTestId("about-why").should("have.length", 1);
    cy.getTestId("about-tech").should("have.length", 1);
    cy.getTestId("about-contributors").should("have.length", 1);

    cy.getTestId("contributor").should("have.length", 6);

    // some misc tests for the header
    cy.getTestId("nav-logo").click();
    cy.url().should("eq", `${baseUrl}/`);
  });
});
