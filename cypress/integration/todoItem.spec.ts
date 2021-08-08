beforeEach(() => {
  cy.visit('https://todomvc.com/examples/vanillajs/');

  ['todo 1', 'todo 2'].forEach((todo) => {
    cy.get('.header input').click().type(todo).type('{enter}');
  });

  cy.get('.todo-list li').eq(0).as('firstItem');
});

//  cypress는 hover가 없다. 이 이슈는 무려 2015년 부터 내려오고 있다.
// https://docs.cypress.io/api/commands/hover#Workarounds
it('hover시 삭제 버튼이 나타난다.', () => {});

it('삭제 버튼을 클릭할 경우 아이템이 사라진다.', () => {
  cy.get('button.destroy').eq(0).click({ force: true });
  cy.get('.todo-list li').should('have.length', 1);
});

it('Active 상태의 아이템을 동그라미 버튼을 누르면 Completed 상태가 된다.', () => {
  cy.get('.todo-list li input.toggle').eq(0).click();
  cy.get('@firstItem').should('have.class', 'completed');
});

it('Completed 상태인 아이템을 클릭하면 Active 상태로 돌아온다', () => {
  cy.get('.todo-list li input.toggle').eq(0).click().click();
  cy.get('@firstItem').should('not.have.class', 'completed');
});
