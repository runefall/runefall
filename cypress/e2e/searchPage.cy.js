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
    cy.getTestId("card-text")
      .first()
      .find(`[data-test-id="region-icons"]`)
      .find("img")
      .first()
      .should("have.attr", "src")
      .should("eq", "/regions/icon-noxus.png");
    cy.getTestId("card-text")
      .last()
      .find(`[data-test-id="region-icons"]`)
      .find("img")
      .first()
      .should("have.attr", "src")
      .should("eq", "/regions/icon-noxus.png");
    cy.getTestId("no-cards").should("not.exist");

    cy.location("search").should("eq", "?mode=text&query=draven");

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

    cy.location("search").should("eq", "?mode=list&query=draven");

    cy.visit("/search?query=asd");
    cy.getTestId("no-cards").should("exist");
    cy.getTestId("card-list-item").should("not.exist");
  });

  it("should display full format properly", () => {
    cy.visit("/search?query=draven");
    cy.getTestId("select-mode").click();
    cy.getTestId("select-mode-full").click();
    cy.getTestId("card-full").should("have.length", 4);
    cy.getTestId("card-full")
      .first()
      .find(`[data-test-id="region-icons"]`)
      .find("img")
      .first()
      .should("have.attr", "src")
      .should("eq", "/regions/icon-noxus.png");
    cy.getTestId("card-full")
      .last()
      .find(`[data-test-id="region-icons"]`)
      .find("img")
      .first()
      .should("have.attr", "src")
      .should("eq", "/regions/icon-noxus.png");
    cy.getTestId("no-cards").should("not.exist");

    cy.location("search").should("eq", "?mode=full&query=draven");

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
    cy.location("search").should(
      "eq",
      "?direction=descending&mode=list&query=draven",
    );

    // rest back to default
    cy.getTestId("select-direction").click();
    cy.getTestId("select-direction-auto").click();
    cy.location("search").should(
      "eq",
      "?direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-card-code").click();
    cy.getTestId("card-list-item").first().contains("01NX020");
    cy.getTestId("card-list-item").last().contains("01NX035");
    cy.location("search").should(
      "eq",
      "?attribute=card_code&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-name").click();
    cy.getTestId("card-list-item").first().contains("01NX020");
    cy.getTestId("card-list-item").last().contains("01NX020T2");
    cy.location("search").should(
      "eq",
      "?attribute=name&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-cost").click();
    cy.getTestId("card-list-item").first().contains("01NX035");
    cy.getTestId("card-list-item").last().contains("01NX020T2");
    cy.location("search").should(
      "eq",
      "?attribute=cost&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-health").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX020T3");
    cy.location("search").should(
      "eq",
      "?attribute=health&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-attack").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX020T3");
    cy.location("search").should(
      "eq",
      "?attribute=attack&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-card-type").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX035");
    cy.location("search").should(
      "eq",
      "?attribute=card_type&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-rarity").click();
    cy.getTestId("card-list-item").first().contains("01NX020T3");
    cy.getTestId("card-list-item").last().contains("01NX020");
    cy.location("search").should(
      "eq",
      "?attribute=rarity&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-region").click();
    cy.getTestId("card-list-item").first().contains("01NX020");
    cy.getTestId("card-list-item").last().contains("01NX020T2");
    cy.location("search").should(
      "eq",
      "?attribute=region&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-artist-name").click();
    cy.getTestId("card-list-item").first().contains("01NX020T2");
    cy.getTestId("card-list-item").last().contains("01NX035");
    cy.location("search").should(
      "eq",
      "?attribute=artist_name&direction=auto&mode=list&query=draven",
    );

    cy.getTestId("select-attribute").click();
    cy.getTestId("select-attribute-set").click();
    cy.getTestId("card-list-item").first().contains("01NX020");
    cy.getTestId("card-list-item").last().contains("01NX020T2");
    cy.location("search").should(
      "eq",
      "?attribute=set&direction=auto&mode=list&query=draven",
    );
  });

  it("should be able to set display modes from URL", () => {
    cy.visit(
      "/search?query=draven&mode=list&attribute=attack&direction=descending",
    );
    cy.getTestId("card-list-item").should("have.length", 4);
    cy.getTestId("card-list-item").first().contains("01NX020T3");
    cy.getTestId("card-list-item").last().contains("01NX020T2");

    cy.visit(
      "/search?query=draven&mode=text&attribute=artist_name&direction=ascending",
    );
    cy.getTestId("card-text").should("have.length", 4);
    cy.getTestId("card-text").first().contains("Draven's Whirling Death");
    cy.getTestId("card-text").last().contains("Draven's Biggest Fan");

    cy.visit("/search?query=draven&mode=asd&attribute=asd&direction=asd");
    cy.getTestId("card-image").should("have.length", 4);
    cy.getTestId("card-image")
      .find("img")
      .first()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set1/en_us/img/cards/01NX020.png",
      );
    cy.getTestId("card-image")
      .find("img")
      .last()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set1/en_us/img/cards/01NX020T2.png",
      );
  });

  it("should use the same parameters when searching within search", () => {
    cy.visit(
      "/search?query=asd&mode=list&attribute=attack&direction=descending",
    );
    cy.getTestId("no-cards").should("exist");
    cy.getTestId("card-list-item").should("not.exist");

    cy.getTestId("nav-search-bar-input").clear().type("draven").type("{enter}");
    cy.location("search").should(
      "eq",
      "?attribute=attack&direction=descending&mode=list&query=draven",
    );
    cy.getTestId("card-list-item").should("have.length", 4);
    cy.getTestId("card-list-item").first().contains("01NX020T3");
    cy.getTestId("card-list-item").last().contains("01NX020T2");
    cy.getTestId("no-cards").should("not.exist");
  });

  it("should reset to default when searching from different page", () => {
    cy.visit("/about");
    cy.getTestId("nav-search-bar-input").type("draven").type("{enter}");
    cy.url().should("eq", `${baseUrl}/search?query=draven`);
  });

  it('should display "Back to Top" button after scrolling down and scroll back to top when clicked', () => {
    cy.visit("/search?query=dar");
    cy.getTestId("back-to-top-button").should("not.exist");

    cy.scrollTo("bottom", { duration: 1000 }).then(() => {
      cy.scrollTo("bottom", { duration: 1000 }).then(() => {
        cy.scrollTo("bottom", { duration: 1000 });
        cy.getTestId("back-to-top-button").should("be.visible");
        cy.getTestId("back-to-top-button").click();
        cy.window().its("scrollY").should("equal", 0);
        cy.getTestId("back-to-top-button").should("not.exist");
      });
    });
  });

  it("should sort cards correctly with a bigger search result", () => {
    cy.visit("/search?query=dar");

    cy.getTestId("card-image").should("have.length", 42);
    cy.getTestId("card-image")
      .find("img")
      .first()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set7/en_us/img/cards/07NX005.png",
      );
    cy.getTestId("card-image")
      .find("img")
      .last()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set6cde/en_us/img/cards/06BC029T3.png",
      );
    cy.getTestId("select-direction").click();
    cy.getTestId("select-direction-descending").click();
    cy.getTestId("card-image")
      .find("img")
      .first()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set6cde/en_us/img/cards/06BC029.png",
      );
    cy.getTestId("card-image")
      .find("img")
      .last()
      .should("have.attr", "src")
      .should(
        "include",
        "http://dd.b.pvp.net/5_6_0/set7/en_us/img/cards/07NX005.png",
      );
  });

  // update tests to be more accurate in the future
  it("should be able to set sorting modes through testing", () => {
    cy.intercept("http://localhost:3000/api/v1/cards/search?query=*", {
      method: "GET",
      fixture: "dravenQuery.json",
    }).as("allDravenQuery");
    // display text happy
    cy.visit("/");
    cy.getTestId("home-search-bar").type("draven mode:text").type("{enter}");
    cy.getTestId("select-mode").contains("Text Only");
    // display text sad
    cy.visit("/");
    cy.getTestId("home-search-bar").type("draven mode:asdasd").type("{enter}");
    cy.getTestId("select-mode").contains("Image Only");
    // display attribute happy
    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("draven attribute:cost")
      .type("{enter}");
    cy.getTestId("select-attribute").contains("Cost");
    // display attribute sad
    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("draven attribute:asdasd")
      .type("{enter}");
    cy.getTestId("select-attribute").contains("Name");
    // display direction happy
    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("draven direction:descending")
      .type("{enter}");
    cy.getTestId("select-direction").contains("Descending");
    // display direction sad
    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("draven direction:asdasd")
      .type("{enter}");
    cy.getTestId("select-direction").contains("Auto");
    // display direction combined
    cy.visit("/");
    cy.getTestId("home-search-bar")
      .type("draven mode:text attribute:attack direction:descending")
      .type("{enter}");
    cy.getTestId("select-mode").contains("Text Only");
    cy.getTestId("select-attribute").contains("Attack");
    cy.getTestId("select-direction").contains("Descending");
  });
});
