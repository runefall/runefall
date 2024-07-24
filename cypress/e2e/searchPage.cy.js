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
    cy.getTestId("image-card").should("have.length", 4);

    cy.visit("/search?query=asd");
    cy.getTestId("no-cards").should("exist");

    cy.getTestId("nav-search-bar-input").clear().type("draven").type("{enter}");
    cy.url().should("eq", `${baseUrl}/search?query=draven`);
    cy.getTestId("image-card").should("have.length", 4);
  });

  it("should display text format properly", () => {
    cy.visit("/search?query=draven");
    cy.getTestId("select-display").click();
    cy.getTestId("select-display-text").click();
  });

  it("should display list format properly", () => {
    cy.visit("/search?query=draven");
    cy.getTestId("select-display").click();
    cy.getTestId("select-display-list").click();
  });

  it("should display full format properly", () => {
    cy.visit("/search?query=draven");
    cy.getTestId("select-display").click();
    cy.getTestId("select-display-full").click();
  });
});
