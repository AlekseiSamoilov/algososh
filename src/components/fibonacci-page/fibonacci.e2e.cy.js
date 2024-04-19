import { addElement } from "../../../cypress/constants";
import { circle } from "../../../cypress/constants";


const input = '[data-testid=fibo-input]';
const button = '[data-testid=fibo-button]';

describe('Fibonacci component', () => {
  beforeEach(() => {
    cy.visit("fibonacci");
  })
  it('button should be disabled with empty input', () => {
    cy.get(input).should('be.visible');
    cy.get(button).should('be.disabled');
    cy.get(input).type('1');
    cy.get(button).should('not.be.disabled');
    cy.get(input).clear();
    cy.get(input).type('0');
    cy.wait(100)
    cy.get(button).should('be.disabled');
  });

  it('correctly calculate fibonacci number', () => {
    cy.addElement('3', button, input, true)
    cy.get(circle).should('have.length', 3);
    cy.wait(2000)
    cy.get(circle).eq(0).should('contain', '1'); 
    cy.get(circle).eq(1).should('contain', '1'); 
    cy.get(circle).eq(2).should('contain', '2');
  })
})
