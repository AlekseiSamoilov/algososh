// Список
// Проверьте, что если в инпуте пусто, то кнопка добавления недоступна, 
// кнопки добавления по индексу и удаления по индексу недоступны тоже.

// Проверьте корректность:
// отрисовки дефолтного списка.
// добавления элемента в head.
// добавления элемента в tail.
// добавления элемента по индексу.
// удаления элемента из head.
// удаления элемента из tail.
// удаления элемента по индексу.

import { circle, addElement, circleHead, circleTail } from "../../../cypress/constants"

const valueInput = '[data-testid=list-value-input]';
const indexInput = '[data-testid=list-index-input]';

const addHeadButton = '[data-testid=list-add-head]';
const addTailButton = '[data-testid=list-add-tail]';
const deleteHeadButton = '[data-testid=list-delete-head]';
const deleteTailButton = '[data-testid=list-delete-tail]';

const addByIndexButton = '[data-testid=list-index-add]';
const deleteByIndexButton = '[data-testid=list-index-delete]';

describe('Linked list component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/list');
    })
    it('Кнопки добавления недоступны и кнопка удаления по индексу недоступны, если в инпутах пусто', () => {
        cy.get(valueInput).should('be.visible');
        cy.get(indexInput).should('be.visible');
        cy.get(addHeadButton).should('be.disabled')
        cy.get(addTailButton).should('be.disabled');
        cy.get(addByIndexButton).should('be.disabled');
        cy.get(deleteByIndexButton).should('be.disabled');
        cy.get(valueInput).type('F');
        cy.get(addHeadButton).should('not.be.disabled');
        cy.get(addHeadButton).click();
        cy.get(deleteHeadButton).click();
        cy.get(addHeadButton).should('be.disabled');
    });

    it('Начальный список содержит символы', () => {
        cy.get(circle).each((el) => {
            cy.wrap(el).find('p').should('not.be.empty');
        });
    });

    it('Добавление элемента в head работает корректно', () => {
        cy.get(valueInput).type('123');
        cy.get(addHeadButton).click();
        cy.get(circle).eq(0).invoke('attr', 'class').should('include', 'small').and('include', 'changing');
        cy.wait(100);
        cy.get(circle).eq(0).invoke('attr', 'class').should('match', /changing/);
        cy.wait(100);
        cy.get(circle).eq(0).invoke('attr', 'class').should('match', /modified/);
        cy.get(circle).eq(0).find('p').should('contain', '123');
        cy.get(circleHead).eq(0).invoke('attr', 'class').should('match', /head/);
        cy.get(circle).eq(0).invoke('attr', 'class').should('match', /default/);
    });

    it('Добавление элемента в tail работает корректно', () => {
        cy.get(valueInput).type('123');
        cy.get(addTailButton).click();
        cy.get(circle).eq(4).invoke('attr', 'class').should('include', 'small');
        cy.wait(100);
        cy.get(circle).eq(5).invoke('attr', 'class').should('match', /changing/)
        cy.wait(100);
        cy.get(circle).eq(5).invoke('attr', 'class').should('match', /modified/);
        cy.get(circle).eq(5).find('p').should('contain', '123');
        cy.get(circleTail).eq(5).invoke('attr', 'class').should('match', /tail/);
        cy.get(circle).eq(5).invoke('attr', 'class').should('match', /default/);
    });

    it('Добавление элемента по индексу работает корректно', () => {
        cy.get(valueInput).type('test');
        cy.get(indexInput).type('3');
        cy.get(circle).eq(3).should('not.contain', 'test')
        cy.get(addByIndexButton).click();
        cy.get(circle).eq(0).invoke('attr', 'class').should('include', 'small').and('include', 'changing');
        cy.get(circle).eq(0).invoke('attr', 'class').should('match', /changing/)
        cy.get(circle).eq(1).invoke('attr', 'class').should('include', 'small').and('include', 'changing');
        cy.get(circle).eq(1).invoke('attr', 'class').should('match', /changing/)
        cy.get(circle).eq(2).invoke('attr', 'class').should('include', 'small').and('include', 'changing');
        cy.get(circle).eq(2).invoke('attr', 'class').should('match', /changing/)
        cy.get(circle).eq(3).invoke('attr', 'class').should('include', 'small').and('include', 'changing');
        cy.get(circle).eq(3).invoke('attr', 'class').should('match', /changing/)
        cy.get(circle).eq(3).invoke('attr', 'class').should('match', /modified/);
        cy.wait(100);
        cy.get(circle).eq(3).invoke('attr', 'class').should('match', /default/);
    });

    it('Удаление элемента из head работает корректно', () => {
        cy.get(valueInput).type('test');
        cy.get(addHeadButton).click();
        cy.get(circle).eq(0).should('contain', 'test');
        cy.get(deleteHeadButton).click();
        cy.get(circle).eq(0).should('not.contain', 'test');
    });

    it('Удаление элемента из tail работает корректно', () => {
        cy.get(valueInput).type('test');
        cy.get(addTailButton).click();
        cy.get(circle).eq(5).should('contain', 'test');
        cy.get(deleteTailButton).click();
        cy.get(circle).eq(5).should('not.contain', 'test');
    });

    it('Удаление элемента по индексу работает корректно', () => {
        cy.get(valueInput).type('test');
        cy.get(indexInput).type('3');
        cy.get(addByIndexButton).click();
        cy.get(circle).eq(3).should('contain', 'test');
        cy.wait(2000);
        cy.get(indexInput).type('03');
        cy.get(deleteByIndexButton).click();
        cy.get(circle).eq(3).should('not.contain', 'test');
    });
});

