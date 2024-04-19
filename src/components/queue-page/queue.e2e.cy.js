

import { circle, circleHead, circleTail } from "../../../cypress/constants";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
 

describe('Queue-page Component', () => {
    beforeEach(() => {
        cy.visit('queue');
        cy.get('[data-testid=queue-input]').as('input');
        cy.get('[data-testid=queue-add]').as('addButton');
        cy.get(circle).as('circle');
        cy.get('[data-testid=queue-delete]').as('deleteButton');
        cy.get('[data-testid=queue-clear]').as('clearButton');
    });
    
    it('add button should be disabled with empty input', () => {
        cy.get('@input').should('be.visible');
        cy.get('@addButton').should('be.disabled');
        cy.get('@input').type('5');
        cy.get('@addButton').click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
    });

    it('elements correctly adding in queue', () => {
        cy.addElement('h', '@addButton', '@input', false);
        cy.get('@circle').eq(0).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.get('@circle').should('contain', 'h');
        cy.get('@circle').eq(0).invoke('attr', 'class').should('match', /default/);
        cy.get(circleHead).eq(0).invoke('attr', 'class').should('match', /head/);
        cy.addElement('i', '@addButton', '@input', false);
        cy.get('@circle').eq(1).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.get('@circle').should('contain', 'i');
        cy.get('@circle').eq(1).invoke('attr', 'class').should('match', /default/);
        cy.get(circleTail).eq(1).invoke('attr', 'class').should('match', /tail/);
        cy.get(circleHead).eq(0).invoke('attr', 'class').should('match', /head/);
    });

    it('should correctly remove an item from the queue', () => {
        cy.addElement('h', '@addButton', '@input', true);
        cy.addElement('i', '@addButton', '@input', true);
        cy.get('@circle').eq(0).find('p').should('contain', 'h');
        cy.get('@circle').eq(1).find('p').should('contain', 'i');
        cy.get('@deleteButton').click();
        cy.get('@circle').eq(0).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.get('@circle').eq(0).find('p').should('not.contain', 'h');
        cy.get('@circle').eq(1).find('p').should('contain', 'i');
      });
      

    it('clear queue button work correctly', () => {
        cy.addElement('h', '@addButton', '@input', true);
        cy.addElement('e', '@addButton', '@input', true);
        cy.addElement('l', '@addButton', '@input', true);
        cy.addElement('l', '@addButton', '@input', true);
        cy.addElement('o', '@addButton', '@input', true);
        cy.get('@clearButton').click();     
        cy.wait(DELAY_IN_MS); 
        cy.get('@circle').each((el) => {
        cy.wrap(el).find('p').should('be.empty');
    });
    })
});