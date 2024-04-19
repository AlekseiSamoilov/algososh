import { SHORT_DELAY_IN_MS } from "../src/constants/delays";

export const circle = "[data-testid=circle]";
export const circleHead = "[data-testid=circle-head]";
export const circleTail = "[data-testid=circle-tail]";

Cypress.Commands.add("addElement", (elem, button, input, delay) => {
  cy.get(input).type(elem);
  cy.get(button).click();
  if (delay) {
    cy.wait(SHORT_DELAY_IN_MS);
  }
});

