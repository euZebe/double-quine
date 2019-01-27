describe("Home page", () => {
  describe("clear all games feature", () => {
    it("should allow do drop all games created in the session", () => {
      // Note: TS yells at us when explicitly tell that window.confirm should be accepted
      // cy.on("window:confirm", () => true);
      cy.visit("/");
      cy.queryAllByTestId("game-card").should("be.empty");
      cy.getByText("Nouvelle partie").click();
      cy.getByText("Fin de partie").click();
      cy.getAllByTestId("game-card").should("have.length", 1);
      cy.get('[aria-label="clear all games"]').click();
      cy.queryAllByTestId("game-card").should("be.empty");
    });

    it("should do nothing when confirm is rejected", () => {
      cy.on("window:confirm", () => false);
      cy.visit("/");
      cy.queryAllByTestId("game-card").should("be.empty");
      cy.getByText("Nouvelle partie").click();
      cy.getByText("Fin de partie").click();
      cy.getAllByTestId("game-card").should("have.length", 1);
      cy.get('[aria-label="clear all games"]').click();
      cy.getAllByTestId("game-card").should("have.length", 1);
    });

    it("should also drop games from a previous session", () => {
      cy.visit("/", {
        onBeforeLoad: win => {
          win.localStorage.setItem("0", JSON.stringify({ pickedValues: [1, 4, 75] }));
          win.localStorage.setItem("1", JSON.stringify({ pickedValues: [54, 39] }));
        }
      });
      cy.getAllByTestId("game-card").should("have.length", 2);
      cy.get('[aria-label="clear all games"]').click();
      cy.queryAllByTestId("game-card").should("be.empty");
    });
  });
});
