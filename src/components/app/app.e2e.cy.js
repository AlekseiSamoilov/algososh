
describe("Application start", () => {
  it("Application success started", () => {
    cy.visit('');
    cy.contains("МБОУ АЛГОСОШ");
  });
  it("Routing to recursion page work", () => {
    cy.visit('recursion');
    cy.contains('Строка');
  });
  it("Routing to fibonacci page work", () => {
    cy.visit('fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });
  it("Routing to sorting page work", () => {
    cy.visit('sorting');
    cy.contains('Сортировка массива');
  });
  it("Routing to stack page work", () => {
    cy.visit('stack');
    cy.contains('Стек');
  });
  it("Routing to queue page work", () => {
    cy.visit('queue');
    cy.contains('Очередь');
  });
  it("Routing to linked-list page work", () => {
    cy.visit('list');
    cy.contains('Связный список');
    cy.contains('Добавить в Head');
  });
});
