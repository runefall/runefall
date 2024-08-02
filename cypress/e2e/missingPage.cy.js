describe("template spec", () => {
  it("should display missing page on invalid urls", () => {
    cy.visit("/");
    cy.getTestId("missing-page").should("not.exist");

    cy.visit("/bing");
    cy.getTestId("missing-page").should("exist");

    cy.visit("/bing/bong");
    cy.getTestId("missing-page").should("exist");
  });
});
