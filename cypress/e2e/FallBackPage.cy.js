describe("fallBackPage", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.intercept(
      "http://localhost:3000/api/v1/cards/search?query=Draven%27s%20Biggest%20Fan",
      {
        forceNetworkError: true,
      },
    ).as("failedSearch");

    cy.intercept("http://localhost:3000/api/v1/cards/01NX020", {
      forceNetworkError: true,
    }).as("failedDetail");

    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("Failed to fetch")) {
        return false;
      }
      return true;
    });
  });

  it("should go to an error page for failed search network request", () => {
    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("Draven's Biggest Fan")
      .type("{enter}");
    cy.getTestId("error-message").should("exist").should("have.length", 1);

    cy.get("header").should("exist").should("have.length", 1);
    cy.get("footer").should("exist").should("have.length", 1);

    cy.getTestId("error-reset-button").click();
    cy.url().should("eq", `${baseUrl}/`);
  });

  it("should go to an error page for failed card detail page network request", () => {
    cy.visit("/card/01NX020");
    cy.getTestId("error-message").should("exist").should("have.length", 1);

    cy.get("header").should("exist").should("have.length", 1);
    cy.get("footer").should("exist").should("have.length", 1);

    cy.getTestId("error-reset-button").click();
    cy.url().should("eq", `${baseUrl}/`);
  });
});
