import syntaxData from '@/data/syntaxData.json';

describe("template spec", () => {
  it('should load the page correctly', () => {
    cy.visit("/syntax");
    cy.get('h1').should('contain.text', 'Runefall Search Syntax');
    cy.get('p').should('contain.text', 'Runefall includes a large set of keywords and expressions you can use to filter Legends of Runeterra cards.');
  });

  it('should render the correct number of syntax entries', () => {
    cy.visit("/syntax");
    cy.getTestId("syntax-entry").should("exist"); 
    cy.getTestId("syntax-entry").children().should('have.length', syntaxData.length);
  });

  it('should navigate to the correct URL when an example is clicked', () => {
    cy.visit("/syntax");
    cy.getTestId("syntax-entry").first().within(() => {
      cy.get('div').first().click();
    });
    cy.url().should('include', '/search?query='); 
  });

  it('should scroll to the top on mount', () => {
    cy.visit("/syntax");
    cy.window().then((win) => {
      cy.stub(win, 'scrollTo').as('scrollToStub');
    });
    cy.visit('/syntax'); 
    cy.get('@scrollToStub').should('have.been.calledWith', 0, 0);
  });
});