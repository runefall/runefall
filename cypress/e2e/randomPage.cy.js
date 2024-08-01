describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");
  it("should get a random card and display it", () => {
    cy.intercept("http://localhost:3000/api/v1/cards/random", {
      fixture: "01NX020.json",
    }).as("01NX020Random");

    cy.intercept("http://localhost:3000/api/v1/cards/01NX020", {
      fixture: "01NX020.json",
    }).as("01NX020Query");

    cy.visit("/random");
    cy.url().should("eq", `${baseUrl}/card/01NX020`);
  });

  it("should get a random card and display it again", () => {
    cy.intercept("http://localhost:3000/api/v1/cards/random", {
      fixture: "01NX020T1.json",
    }).as("01NX020T1Random");

    cy.intercept("http://localhost:3000/api/v1/cards/01NX020T1", {
      fixture: "01NX020T1.json",
    }).as("01NX020T1Query");

    cy.visit("/random");
    cy.url().should("eq", `${baseUrl}/card/01NX020T1`);
  });
});
