describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.intercept(
      "http://localhost:3000/api/v1/cards/search?query=Draven%27s%20Biggest%20Fan",
      {
        method: "GET",
        fixture: "dravensBiggestFanQuery.json",
      },
    ).as("getTestQuery");

    cy.intercept("http://localhost:3000/api/v1/cards/search?query=draven", {
      method: "GET",
      fixture: "dravenQuery.json",
    }).as("getDravenQuery");
  });

  it("This checks to make sure the homepage displays properly", () => {
    cy.visit("/");

    cy.get("header").should("not.exist");
    cy.get("footer").should("exist");

    cy.getTestId("home-slogan").contains(
      "Runefall is a powerful Legends of Runeterra card search",
    );

    cy.getTestId("home-search-bar").focused().type("draven").type("{enter}");
    cy.url().should("eq", `${baseUrl}/search?query=draven`);
    cy.getTestId("nav-search-bar-input").should("have.value", "draven");

    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("Draven's Biggest Fan")
      .type("{enter}");
    cy.url().should("eq", `${baseUrl}/card/01NX035`);
    cy.getTestId("nav-search-bar-input").should(
      "have.value",
      "Draven's Biggest Fan",
    );

    // some misc tests for the header
    cy.getTestId("nav-logo").click();
    cy.url().should("eq", `${baseUrl}/`);
  });
});
