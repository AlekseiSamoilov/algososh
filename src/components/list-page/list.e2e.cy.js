
import { circle, circleHead, circleTail } from "../../../cypress/constants"


describe('Linked list component', () => {
    beforeEach(() => {
        cy.visit('list');
        cy.get('[data-testid=list-value-input]').as('valueInput');
        cy.get('[data-testid=list-index-input]').as('indexInput');
        cy.get('[data-testid=list-add-head]').as('addHeadButton');
        cy.get('[data-testid=list-add-tail]').as('addTailButton');
        cy.get('[data-testid=list-delete-head]').as('deleteHeadButton');
        cy.get('[data-testid=list-delete-tail]').as('deleteTailButton');
        cy.get('[data-testid=list-index-add]').as('addByIndexButton');
        cy.get('[data-testid=list-index-delete]').as('deleteByIndexButton');
    })
    it('Кнопки добавления и кнопки удаления не доступны, если в инпутах пусто', () => {
        cy.get('@valueInput').should('be.visible');
        cy.get('@indexInput').should('be.visible');
        cy.get('@addHeadButton').should('be.disabled')
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addByIndexButton').should('be.disabled');
        cy.get('@deleteByIndexButton').should('be.disabled');
        cy.get('@valueInput').type('F');
        cy.get('@addHeadButton').should('not.be.disabled');
        cy.get('@addHeadButton').click();
        cy.get('@deleteHeadButton').click();
        cy.get('@addHeadButton').should('be.disabled');
    });

    it('Начальный список содержит символы', () => {
        cy.get(circle).each((el) => {
            cy.wrap(el).find('p').should('not.be.empty');
        });
    });

    it('Добавление элемента в head работает корректно', () => {
        cy.get('@valueInput').type('123');
        cy.get('@addHeadButton').click();
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
        cy.get('@valueInput').type('123');
        cy.get('@addTailButton').click();
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
        cy.get('@valueInput').type('test');
        cy.get('@indexInput').type('3');
        cy.get(circle).eq(3).should('not.contain', 'test')
        cy.get('@addByIndexButton').click();
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
        cy.get('@valueInput').type('test');
        cy.get('@addHeadButton').click();
        cy.get(circle).eq(0).should('contain', 'test');
        cy.get('@deleteHeadButton').click();
        cy.get(circle).eq(0).should('not.contain', 'test');
    });

    it('Удаление элемента из tail работает корректно', () => {
        cy.get('@valueInput').type('test');
        cy.get('@addTailButton').click();
        cy.get(circle).eq(5).should('contain', 'test');
        cy.get('@deleteTailButton').click();
        cy.get(circle).eq(5).should('not.contain', 'test');
    });

    it('Удаление элемента по индексу работает корректно', () => {
        cy.get('@valueInput').type('test');
        cy.get('@indexInput').type('3');
        cy.get('@addByIndexButton').click();
        cy.get(circle).eq(3).should('contain', 'test');
        cy.wait(2000);
        cy.get('@indexInput').type('03');
        cy.get('@deleteByIndexButton').click();
        cy.get(circle).eq(3).should('not.contain', 'test');
    });
});

