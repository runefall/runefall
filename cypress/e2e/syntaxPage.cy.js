import syntaxData from "@/data/syntaxData.json";

describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/v1/cards/search?query=*", {
      fixture: "asdQuery.json",
    });
  });

  it("should load the page correctly", () => {
    cy.visit("/syntax");
    cy.get("h1").should("contain.text", "Runefall Search Syntax");
    cy.get("p").should(
      "contain.text",
      "Runefall includes a large set of keywords and expressions you can use to filter Legends of Runeterra cards.",
    );

    cy.getTestId("syntax-entry")
      .children()
      .should("have.length", syntaxData.length);
  });

  it("should navigate to the correct URL when an example is clicked", () => {
    cy.visit("/syntax");
    cy.getTestId("syntax-entry")
      .first()
      .find('[data-test-id="syntax-example"]')
      .first()
      .then(($syntax) => {
        const text = $syntax.text();
        cy.wrap($syntax).click();
        cy.url().should("eq", `${baseUrl}/search?query=${encodeURI(text)}`);
        cy.visit("/syntax");
      });
    cy.getTestId("syntax-entry")
      .first()
      .find('[data-test-id="syntax-example"]')
      .last()
      .then(($syntax) => {
        const text = $syntax.text();
        cy.wrap($syntax).click();
        cy.url().should("eq", `${baseUrl}/search?query=${encodeURI(text)}`);
        cy.visit("/syntax");
      });
  });

  // it("should scroll to the top on mount", () => {
  //   cy.visit("/syntax");
  //   cy.window().then((win) => {
  //     cy.stub(win, "scrollTo").as("scrollToStub");
  //   });
  //   cy.visit("/syntax");
  //   cy.get("@scrollToStub").should("have.been.calledWith", 0, 0);
  // });
});
