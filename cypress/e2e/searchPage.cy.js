describe("template spec", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/v1/cards/search?query=draven", {
      method: "GET",
      fixture: "dravenQuery.json",
    }).as("getDravenQuery");

    cy.intercept("http://localhost:3000/api/v1/cards/search?query=asd", {
      method: "GET",
      fixture: "asdQuery.json",
    }).as("getTestQuery");

    cy.intercept("http://localhost:3000/api/v1/cards/search?query=dar", {
      method: "GET",
      fixture: "darQuery.json",
    }).as("getLargeResult");
  });

  it("should have a working header search bar", () => {
    cy.visit("/search?query=asd");
    cy.getTestId("no-cards").should("exist");
    cy.getTestId("card-image").should("not.exist");

    cy.getTestId("nav-search-bar-input").clear().type("draven").type("{enter}");
    cy.url().should("eq", `${baseUrl}/search?query=draven`);
    cy.getTestId("card-image").should("have.length", 4);
    cy.getTestId("no-cards").should("not.exist");
  });

  it("should display image format correctly", () => {
    cy.visit("/search?query=draven");
    cy.get("header").should("exist").should("have.length", 1);
    cy.get("footer").should("exist").should("have.length", 1);
    cy.getTestId("card-image").should("have.length", 4);
    cy.getTestId("no-cards").should("not.exist");

    cy.visit("/search?query=asd");
    cy.getTestId("no-cards").should("exist");
    cy.getTestId("card-image").should("not.exist");
  });

  it("should display text format properly", () => {
    cy.visit("/search?query=draven");
    cy.getTestId("select-mode").click();
    cy.getTestId("select-mode-text").click();
    cy.getTestId("card-text").should("have.length", 4);
    cy.getTestId("no-cards").should("not.exist");

    cy.visit("/search?query=asd");
    cy.getTestId("no-cards").should("exist");
    cy.getTestId("card-text").should("not.exist");
  });

  it("should display list format properly", () => {
    cy.visit("/search?query=draven");
    cy.getTestId("select-mode").click();
    cy.getTestId("select-mode-list").click();
    cy.getTestId("card-list-item").should("have.length", 4);
    cy.getTestId("no-cards").should("not.exist");

    cy.visit("/search?query=asd");
    cy.getTestId("no-cards").should("exist");
    cy.getTestId("card-list-item").should("not.exist");
  });

  it("should display full format properly", () => {
    cy.visit("/search?query=draven");
    cy.getTestId("select-mode").click();
    cy.getTestId("select-mode-full").click();
    cy.getTestId("card-full").should("have.length", 4);
    cy.getTestId("no-cards").should("not.exist");

    cy.visit("/search?query=asd");
    cy.getTestId("no-cards").should("exist");
    cy.getTestId("card-mode-full").should("not.exist");
  });

  it("should sort cards correctly accounting for sort direction", () => {
    cy.visit("/search?query=draven");
    cy.getTestId("select-mode").click();
    cy.getTestId("select-mode-list").click();

    cy.getTestId("card-list-item").should("have.length", 4);
    cy.getTestId("card-list-item").first().contains("01NX020");
    cy.getTestId("card-list-item").last().contains("01NX020T2");
    cy.getTestId("select-direction").click();
    cy.getTestId("select-direction-descending").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX020");

    // rest back to default
    cy.getTestId("select-direction").click();
    cy.getTestId("select-direction-auto").click();

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-card-code").click();
    cy.getTestId("card-list-item").first().contains("01NX020");
    cy.getTestId("card-list-item").last().contains("01NX035");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-name").click();
    cy.getTestId("card-list-item").first().contains("01NX020");
    cy.getTestId("card-list-item").last().contains("01NX020T2");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-cost").click();
    cy.getTestId("card-list-item").first().contains("01NX035");
    cy.getTestId("card-list-item").last().contains("01NX020T2");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-health").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX020T3");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-attack").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX020T3");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-card-type").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX035");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-rarity").click();
    cy.getTestId("card-list-item").first().contains("01NX020T3");
    cy.getTestId("card-list-item").last().contains("01NX020");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-region-refs").click();
    cy.getTestId("card-list-item").first().contains("01NX020T3");
    cy.getTestId("card-list-item").last().contains("01NX020T2");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-artist-name").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX035");

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-set").click();
    cy.getTestId("card-list-item").first().contains("01NX020T3");
    cy.getTestId("card-list-item").last().contains("01NX020T2");
  });
  it('should display "Back to Top" button after scrolling down and scroll back to top when clicked', () => {
    cy.visit("/search?query=dar");
    cy.getTestId('back-to-top-button').should('not.exist');

    cy.scrollTo('bottom');

    cy.getTestId('back-to-top-button').should('be.visible');

    cy.getTestId('back-to-top-button').click();

    cy.window().its('scrollY').should('equal', 0);

    cy.getTestId('back-to-top-button').should('not.exist');
  }); 
});
