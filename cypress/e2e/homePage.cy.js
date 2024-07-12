describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");

  it("This checks to make sure the homepage displays properly", () => {
    cy.visit("/");
    cy.get("header").should("not.exist");
    cy.get("footer").should("exist");

    cy.getTestId("home-slogan").contains(
      "Runefall is a powerful Legends of Runeterra card search",
    );

    cy.getTestId("home-search-bar").focused().type("draven").type("{enter}");
    cy.url().should("include", `${baseUrl}/search?query=draven`);

    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("Draven's Biggest Fan")
      .type("{enter}");
    cy.url().should(
      "include",
      `${baseUrl}/search?query=Draven%27s%20Biggest%20Fan`,
    );
  });
});
