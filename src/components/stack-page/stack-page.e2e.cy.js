// Стек
// Проверьте, что если в инпуте пусто, то кнопка добавления недоступна.
// Проверьте правильность добавления элемента в стек. 
// Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно.
// Проверить правильность удаления элемента из стека.
// Проверьте поведение кнопки «Очистить». 
// Добавьте в стек несколько элементов, по нажатию на кнопку «Очистить» длина стека должна быть равна 0.

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import {circle, addElement } from '../../../cypress/constants'

const input = '[data-testid=stack-input]';
const buttonAdd = '[data-testid=stack-add]'
const buttonDelete ='[data-testid=stack-delete]';
const buttonClear = '[data-testid=stack-clear]';


describe('Stack-page component', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/stack")
    });
    it('add button should be disable with empty input', () => {
        cy.get(input).should('be.visible');
        cy.get(buttonAdd).should('be.disabled');
        cy.get(input).type('w');
        cy.get(buttonAdd).should('not.be.disabled');
        cy.get(input).clear();
        cy.get(buttonAdd).should('be.disabled');
    });
    it('correctly adding and deleting elements with correct color', () => {
        cy.get(input).type('h');
        cy.get(buttonAdd).click();
        cy.get(circle).eq(0).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circle).eq(0).invoke('attr', 'class')         
        .should('match', /default/); 
        cy.get(circle).eq(0).should('contain', 'h');
        cy.get(input).type('i');
        cy.get(buttonAdd).click();
        cy.get(circle).eq(1).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circle).eq(1).invoke('attr', 'class')         
        .should('match', /default/); 
        cy.get(circle).eq(1).should('contain', 'i');
        cy.get(circle).should('have.length', 2)
        cy.get(buttonDelete).click();
        cy.get(circle).eq(1).invoke('attr', 'class')         
        .should('match', /changing/); 
        cy.get(circle).should('have.length', 1);
    });

    it('clear button works correctly', () => {
        addElement('h', buttonAdd, input, true);
        addElement('e', buttonAdd, input, true);
        addElement('l', buttonAdd, input, true);
        addElement('l', buttonAdd, input, true);
        addElement('o', buttonAdd, input, true);
        cy.get(circle).should('have.length', 5);
        cy.get(buttonClear).click();
        cy.get(circle).should('have.length', 0);
    })
})