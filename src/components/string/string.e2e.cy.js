import { DELAY_IN_MS } from "../../constants/delays";
import {circle } from '../../../cypress/constants'


const input = '[data-testid=string-input]';
const button = '[data-testid=reverse-button]'

describe("String Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("button should be disabled whith empty input", () => {
    cy.get(input).should("be.visible");
    cy.get(button).should("be.disabled");
    cy.get(input).type("hello");
    cy.get(button).should("not.be.disabled");
    cy.get(input).clear();
    cy.get(button).should("be.disabled");
  });

  
  it('string have default state and length after intered in input', () => {
    cy.get(input).type('hello');
    cy.get(circle).should('have.length', 5).each(($circle) => {
      expect($circle).to.have.attr('class').and.match(/default/); 
    });
  });

  it('changing state work correctly', () => {
    cy.get(input).type('hello');
    cy.get(button).click();
    cy.wait(100);
      cy.get(circle).then(($circles) => {
        Array.from($circles).some(circle =>
          circle.className.includes('changing')
        );
      });
  });

  it('modified state work correctly and reverse string is ok', () => {
    cy.get(input).type('hello');
    cy.get(button).click();
    cy.wait(DELAY_IN_MS);
    cy.get(circle).then(($circles) => {
      Array.from($circles).some(circle => circle.className.includes('modified'));
    });
    cy.wait(4000);
    cy.get(circle).eq(0).should('contain', 'o');
    cy.get(circle).eq(1).should('contain', 'l');
    cy.get(circle).eq(2).should('contain', 'l');
    cy.get(circle).eq(3).should('contain', 'e');
    cy.get(circle).eq(4).should('contain', 'h');
  });
  
});

