describe("template spec", () => {
  it("This is a test", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#test").contains("This is a test.");
  });
});
