
describe("Application start", () => {
  it("Application success started", () => {
    cy.visit("http://localhost:3000");
    cy.contains("МБОУ АЛГОСОШ");
  });
  it("Routing to recursion page work", () => {
    cy.visit('http://localhost:3000/recursion');
    cy.contains('Строка');
  });
  it("Routing to fibonacci page work", () => {
    cy.visit('http://localhost:3000/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });
  it("Routing to sorting page work", () => {
    cy.visit('http://localhost:3000/sorting');
    cy.contains('Сортировка массива');
  });
  it("Routing to stack page work", () => {
    cy.visit('http://localhost:3000/stack');
    cy.contains('Стек');
  });
  it("Routing to queue page work", () => {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Очередь');
  });
  it("Routing to linked-list page work", () => {
    cy.visit('http://localhost:3000/list');
    cy.contains('Связный список');
    cy.contains('Добавить в Head');
  });
});
