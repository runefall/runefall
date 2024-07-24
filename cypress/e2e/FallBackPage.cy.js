describe("template spec", () => {
  beforeEach(() => {
    cy.intercept(
      "http://localhost:3000/api/v1/cards/search?query=Draven%27s%20Biggest%20Fan",
      {
        forceNetworkError: true
      },
    ).as("failed");

    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Failed to fetch')) {
        return false;
      }
      return true;
    });
  });

  it("passes", () => {
    cy.visit("http://localhost:5173");
    cy.get('.relative > .flex').type("Draven's Biggest Fan").type("{enter}");
    cy.url().should('contain', '/error')
    cy.get('.shadow-center-md > .text-xl').should('contain', 'Something Went Wrong:')
    cy.get('.text-4xl').should('contain', 'RUNEFALL')
    cy.get('.bg-gray-700 > .max-w-screen-xl').should('exist')
    cy.get('.bg-primary').click()
    cy.url().should('contain', '/' )
  });
});
