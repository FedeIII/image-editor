describe("Editor", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("contains all the tools", () => {
    cy.get("#tools").contains("No tool");
    cy.get("#tools").contains("Color picker");
    cy.get("#tools").contains("Zoom in");
    cy.get("#tools").contains("Zoom out");
  });

  describe("When an image is selected", () => {
    beforeEach(() => {
      cy.get("#input").selectFile("cypress/fixtures/stub.png");
    });

    describe("No tool", () => {
      beforeEach(() => {
        cy.get("#no-tool").click();
      });

      it("selects the tool on click", function () {
        cy.get("#no-tool").should("have.class", "tooltip--selected");
      });
    });

    describe("Color picker", () => {
      beforeEach(() => {
        cy.get("#color-picker").click();
      });

      it("shows the picked color in the tool data", function () {
        return cy.get("#canvas").then(($canvas) => {
          const width = <number>$canvas.width();

          cy.get("#canvas").click(50, 50);
          cy.get("#tool-data").contains("#FF0000");

          cy.get("#canvas").click(width - 50, 50);
          cy.get("#tool-data").contains("#00FFFF");
        });
      });

      describe("Zoom in", () => {
        beforeEach(() => {
          cy.get("#zoom-in").click();
        });

        it("shows the real resolution of the image", function () {
          cy.get("#canvas").click();
          return cy.get("#canvas").then(($canvas) => {
            const width = $canvas.width();
            expect(width).to.equal(200);
          });
        });
      });

      describe("Zoom out", () => {
        beforeEach(() => {
          cy.get("#zoom-in").click();
          cy.get("#canvas").click();
          cy.get("#zoom-out").click();
        });

        it("fits the image into the window", function () {
          cy.get("#canvas").click();
          return cy.get("#canvas").then(($canvas) => {
            const width = $canvas.width();
            expect(width).not.to.equal(200);
          });
        });
      });
    });
  });
});
