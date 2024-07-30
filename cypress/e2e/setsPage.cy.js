describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/v1/cards/search?query=set:Set1", {
      method: "GET",
      fixture: "set1.json",
    }).as("getSet1");

    cy.intercept("http://localhost:3000/api/v1/cards/search?query=set:Set9", {
      method: "GET",
      fixture: "set9.json",
    }).as("getSet9");
  });

  it("passes", () => {
    cy.visit("/sets");
    cy.getTestId("set-item").should("have.length", 11);

    cy.getTestId("set-item").first().contains("Foundations");
    cy.getTestId("set-item").first().click();
    cy.url().should("eq", `${baseUrl}/search?query=set%3ASet1`);
    cy.getTestId("nav-search-bar-input").should("have.value", "set:Set1");

    cy.visit("/sets");
    cy.getTestId("set-item").last().contains("Dreamlit Paths");
    cy.getTestId("set-item").last().click();
    cy.url().should("eq", `${baseUrl}/search?query=set%3ASet9`);
    cy.getTestId("nav-search-bar-input").should("have.value", "set:Set9");
  });
});
