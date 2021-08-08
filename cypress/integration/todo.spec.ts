beforeEach(() => {
  cy.visit('https://todomvc.com/examples/vanillajs/');
});

it('header의 input에 값을 입력한 뒤 엔터를 누르면 투두가 추가된다.', () => {
  cy.get('.header input').click().type('todo 1').type('{enter}');

  cy.get('.todo-list li').should('have.length', 1).should('have.text', 'todo 1');
});
