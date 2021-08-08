beforeEach(() => {
  cy.visit('https://todomvc.com/examples/vanillajs/');
  const todoList = ['completed todo', 'active todo'];

  todoList.forEach((todo) => {
    cy.get('.header input').click().type(todo).type('{enter}');
  });

  cy.get('.todo-list li input.toggle').eq(0).click();
});

it('Active 버튼 클릭시 Active 상태의 아이템만 나타난다', async () => {
  cy.get('.filters').contains('Active').click();

  cy.get('.todo-list li').should('have.length', 1).should('have.text', 'active todo');
});

it('Completed 버튼 클릭시 Completed 상태의 아이템만 나타난다', () => {
  cy.get('.filters').contains('Completed').click();

  cy.get('.todo-list li').should('have.length', 1).should('have.text', 'completed todo');
});

it('All 버튼 클릭시 모든 상태의 아이템이 나타난다', () => {
  cy.get('.filters').contains('Active').click();
  cy.get('.filters').contains('All').click();

  cy.get('.todo-list li').should('have.length', 2);
  ['completed todo', 'active todo'].forEach((todo, idx) => {
    cy.get('.todo-list li').eq(idx).should('have.text', todo);
  });
});
