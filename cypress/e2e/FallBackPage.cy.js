describe("fallBackPage", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.intercept(
      "http://localhost:3000/api/v1/cards/search?query=Draven%27s%20Biggest%20Fan",
      {
        forceNetworkError: true,
      },
    ).as("failed");

    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("Failed to fetch")) {
        return false;
      }
      return true;
    });
  });

  it("should go to an error page if there is an error detected", () => {
    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("Draven's Biggest Fan")
      .type("{enter}");
    cy.url().should("eq", `${baseUrl}/error`);
    cy.getTestId("error-message").should("contain", "Something Went Wrong:");

    cy.get("header").should("exist").should("have.length", 1);
    cy.get("footer").should("exist").should("have.length", 1);

    cy.getTestId("error-reset-button").click();
    cy.url().should("eq", `${baseUrl}/`);
  });
});
