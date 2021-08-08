beforeEach(() => {
  cy.visit('https://todomvc.com/examples/vanillajs/');
});

it('초기값은 0이다', () => {
  cy.get('footer .todo-count strong').should('have.text', '0');
});

it('투두 추가시 잔여 item이 증가한다', () => {
  cy.get('.header input').click().type('todo 1').type('{enter}');
  cy.get('footer .todo-count strong').should('have.text', '1');
});

it('투두 완료시 잔여 item이 감소한다', () => {
  cy.get('.header input').click().type('todo 1').type('{enter}');
  cy.get('.todo-list li .toggle').click();

  cy.get('footer .todo-count strong').should('have.text', '0');
});
