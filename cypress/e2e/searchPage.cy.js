describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/v1/cards/search?query=draven", {
      method: "GET",
      fixture: "dravenQuery.json",
    }).as("getDravenQuery");

    cy.intercept("http://localhost:3000/api/v1/cards/search?query=asd", {
      method: "GET",
      fixture: "asdQuery.json",
    }).as("getTestQuery");
  });

  it("should display the search results correctly", () => {
    cy.visit("/search?query=draven");
    cy.get("header").should("exist").should("have.length", 1);
    cy.get("footer").should("exist").should("have.length", 1);
    cy.getTestId("search-card").should("have.length", 4);

    cy.visit("/search?query=asd");
    cy.getTestId("no-cards").should("exist");

    cy.getTestId("nav-search-bar-input").clear().type("draven").type("{enter}");
    cy.url().should("eq", `${baseUrl}/search?query=draven`);
    cy.getTestId("search-card").should("have.length", 4);
  });
});
