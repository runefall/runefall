describe("template spec", () => {
  it("This is a test", () => {
    cy.visit("http://localhost:5173/");
    cy.getTestId("slogan").contains(
      "Runefall is a powerful Legends of Runeterra card search",
    );
  });
});
