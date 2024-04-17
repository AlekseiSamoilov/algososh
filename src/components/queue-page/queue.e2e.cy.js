// Очередь
// Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.

// Проверьте, правильность добавления элемента в очередь. 
// Необходимо убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
// Не забудьте проверить, что курсоры head и tail отрисовываются корректно.

// Проверить правильность удаления элемента из очереди.

// Проверьте поведение кнопки «Очистить». 
// Добавьте в очередь несколько элементов, по нажатию на кнопку «Очистить» длина очереди должна быть равна 0.

import { circle, addElement, circleHead, circleTail } from "../../../cypress/constants";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

const input = '[data-testid=queue-input]';
const addButton = '[data-testid=queue-add]';
const deleteButton = '[data-testid=queue-delete]';
const clearButton = '[data-testid=queue-clear]';
 

describe('Queue-page Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/queue')
    });
    
    it('add button should be disabled with empty input', () => {
        cy.get(input).should('be.visible');
        cy.get(addButton).should('be.disabled');
        cy.get(input).type('5');
        cy.get(addButton).click();
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(addButton).should('be.disabled');
    });

    it('elements correctly adding in queue', () => {
        addElement('h', addButton, input, false);
        cy.get(circle).eq(0).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.get(circle).should('contain', 'h');
        cy.get(circle).eq(0).invoke('attr', 'class').should('match', /default/);
        cy.get(circleHead).eq(0).invoke('attr', 'class').should('match', /head/);
        addElement('i', addButton, input, false);
        cy.get(circle).eq(1).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.get(circle).should('contain', 'i');
        cy.get(circle).eq(1).invoke('attr', 'class').should('match', /default/);
        cy.get(circleTail).eq(1).invoke('attr', 'class').should('match', /tail/);
        cy.get(circleHead).eq(0).invoke('attr', 'class').should('match', /head/);
    });

    it('should correctly remove an item from the queue', () => {
        addElement('h', addButton, input, true);
        addElement('i', addButton, input, true);
        cy.get(circle).eq(0).find('p').should('contain', 'h');
        cy.get(circle).eq(1).find('p').should('contain', 'i');
        cy.get(deleteButton).click();
        cy.get(circle).eq(0).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.get(circle).eq(0).find('p').should('not.contain', 'h');
        cy.get(circle).eq(1).find('p').should('contain', 'i');
      });
      

    it('clear queue button work correctly', () => {
        addElement('h', addButton, input, true);
        addElement('e', addButton, input, true);
        addElement('l', addButton, input, true);
        addElement('l', addButton, input, true);
        addElement('o', addButton, input, true);
        cy.get(clearButton).click();     
        cy.wait(DELAY_IN_MS); 
        cy.get(circle).each((el) => {
        cy.wrap(el).find('p').should('be.empty');
    });
    })
});