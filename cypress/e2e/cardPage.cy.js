describe("CardPage component", () => {
    const baseUrl = Cypress.config("baseUrl");
  
    it("displays the card details properly", () => {
      const cardCode = "01NX020";
  
      cy.visit(`/card/${cardCode}`);
  
      cy.get(".card-title").should("not.exist");
      cy.get(".card-details").should("exist");
  
      cy.get(".card-cost").should("exist");
      cy.get(".card-details h2").should("exist");
      cy.get(".card-details p").should("exist");
  
      cy.get(".card-details").within(() => {
        cy.get(".card-cost").should("have.class", "rounded-full"); // This isnt working, though. 
          cy.get("h2").contains("Draven");
          cy.get("p").first().contains("Unit / Champion / Set1");
          cy.get("p").eq(1).contains("Keywords: Quick Attack");
          cy.get("p").eq(2).contains("When I'm summoned or strike: Create a Spinning Axe in hand.");
          cy.get("p").eq(3).contains("Level Up: I've struck with 2+ total Spinning Axes.");
          cy.get("p").eq(4).contains("You want an autograph? Get in line, pal.");
  
        cy.get("h3").contains("Attack: 3");
        cy.get("h3").contains("Health: 3");
  
        cy.get("p").contains("Artist: SIXMOREVODKA");
  
        cy.get("p").contains("Card Code: 01NX020");
  
        cy.get("h3").contains("Modes");
      });
  
      // Related Cards
      cy.get(".related-cards-title").should("exist").contains("RELATED CARDS");
      cy.get(".related-cards").within(() => {
        cy.get(".related-card").should("have.length.greaterThan", 0);
      });
    });
  });
  