import { SHORT_DELAY_IN_MS } from "../src/constants/delays";

export const circle = "[data-testid=circle]";
export const circleHead = "[data-testid=circle-head]";
export const circleTail = "[data-testid=circle-tail]";

/** 
Функция добавление элемента 
@param { string } elem - значение для ввода в инпут 
@param { string } button - кнопка для добавления элемента в инпут
@param { string } input - выбранный инпут в который будет вводиться значение
@param { boolean} delay - задержка после нажатия кнопки 500 ms
*/

export const addElement = (
  elem,
  button,
  input,
  delay
) => {
  cy.get(input).type(`${elem}`);
  cy.get(button).click();
  if (delay) {
    cy.wait(SHORT_DELAY_IN_MS);
  }
};
