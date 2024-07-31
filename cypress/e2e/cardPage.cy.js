describe("CardPage component", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/v1/cards/01NX020", {
      method: "GET",
      fixture: "01NX020.json",
    }).as("getDravenCard");

    cy.intercept("http://localhost:3000/api/v1/cards/01NX020T1", {
      method: "GET",
      fixture: "01NX020T1.json",
    }).as("getSpinningAxeCard");
  });

  it("displays the card details properly", () => {
    cy.visit(`/card/01NX020`);

    // Test card works
    cy.getTestId("card-full")
      .find("img")
      .should("have.attr", "src")
      .should(
        "eq",
        "http://dd.b.pvp.net/5_6_0/set1/en_us/img/cards/01NX020.png",
      );
    cy.getTestId("card-full").contains("Draven");
    cy.getTestId("card-cost").contains("3");
    cy.getTestId("region-icons")
      .find("img")
      .should("have.attr", "src")
      .should("eq", "/regions/icon-noxus.png");
    cy.getTestId("card-full").contains("Unit / Champion / Foundations");
    cy.getTestId("card-full").contains("Keywords: Quick Attack");
    cy.getTestId("card-full").contains(
      "When I'm summoned or strike: Create a Spinning Axe in hand.",
    );
    cy.getTestId("card-full").contains(
      "Level Up: I've struck with 2+ total Spinning Axes.",
    );
    cy.getTestId("card-full").contains(
      "You want an autograph? Get in line, pal.",
    );
    cy.getTestId("card-stats").contains("3 | 3");
    cy.getTestId("card-full").contains("Illustration by SIXMOREVODKA");
    cy.getTestId("card-full").contains("Card Code: 01NX020");

    cy.getTestId("format-legality").should("have.length", 3);
    cy.getTestId("format-legality").first().contains("Not Legal");
    cy.getTestId("format-legality").last().contains("Legal");

    // Test that associated cards works
    cy.getTestId("associated-card").should("have.length", 3);
    cy.getTestId("associated-card")
      .first()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set1/en_us/img/cards/01NX020T1.png",
      );
    cy.getTestId("associated-card")
      .last()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set1/en_us/img/cards/01NX020T2.png",
      );

    cy.getTestId("associated-card").first().click();
    cy.url().should("eq", `${baseUrl}/card/01NX020T1`);

    // Test the associated card that was navigated to
    cy.getTestId("card-full")
      .find("img")
      .should("have.attr", "src")
      .should(
        "eq",
        "http://dd.b.pvp.net/5_6_0/set1/en_us/img/cards/01NX020T1.png",
      );

    cy.getTestId("card-full").contains("Spinning Axe");
    cy.getTestId("card-cost").contains("0");
    cy.getTestId("region-icons")
      .find("img")
      .should("have.attr", "src")
      .should("eq", "/regions/icon-noxus.png");
    cy.getTestId("card-full").contains("Spell - Burst / None / Foundations");
    cy.getTestId("card-full").contains("Keywords: Burst");
    cy.getTestId("card-full").contains(
      "To play, discard 1. Give an ally +1|+0 this round.",
    );
    cy.getTestId("card-full").contains(
      `"Yeah, his brother'd win one-on-one, but you see those axes spiraling... it's art, it is. Art." - Arena regular`,
    );
    cy.getTestId("card-stats").should("not.exist");
    cy.getTestId("card-full").contains("Illustration by SIXMOREVODKA");
    cy.getTestId("card-full").contains("Card Code: 01NX020T1");

    cy.getTestId("format-legality").should("have.length", 3);
    cy.getTestId("format-legality").first().contains("Legal");
    cy.getTestId("format-legality").last().contains("Not Legal");

    cy.getTestId("associated-card").should("have.length", 1);
    cy.getTestId("associated-card")
      .first()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set1/en_us/img/cards/01NX020.png",
      );
  });
});
