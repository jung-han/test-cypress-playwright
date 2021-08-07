import { test as base, expect, ElementHandle } from '@playwright/test';

const url = 'https://todomvc.com/examples/vanillajs/';

const test = base.extend<{ firstItem: ElementHandle<HTMLElement | SVGElement> }>({
  page: async ({ page }, use) => {
    const todoList = ['todo 1', 'todo 2'];
    await page.goto(url);

    for (let todo of todoList) {
      await page.click('.header input');
      await page.keyboard.type(todo);
      await page.keyboard.press('Enter');
    }

    await use(page);
  },
  firstItem: async ({ page }, use) => {
    const firstItem = await page.$$('.todo-list li');
    await use(firstItem[0]);
  },
});

test.beforeEach(() => {
  // setup
});

test.afterEach(() => {
  // teardown
});

test('hover시 삭제 버튼이 나타난다.', async ({ firstItem }) => {
  await firstItem?.hover();
  const firstItemDeleteButton = await firstItem.$('button.destroy');
  const deleteButtonVisible = await firstItemDeleteButton?.isVisible();
  expect(deleteButtonVisible).toBeTruthy();
});

test('삭제 버튼을 클릭할 경우 아이템이 사라진다.', async ({ page, firstItem }) => {
  await firstItem?.hover();
  const firstItemDeleteButton = await firstItem.$('button.destroy');
  await firstItemDeleteButton?.click();

  const list = await page.$$('.todo-list li');
  expect(list.length).toEqual(1);
});

test('Active 상태의 아이템을 동그라미 버튼을 누르면 Completed 상태가 된다.', async ({
  firstItem,
}) => {
  const toggleInput = await firstItem.$('.toggle');
  await toggleInput?.click();

  const firstItemClassName = await firstItem.getAttribute('class');
  expect(firstItemClassName).toBe('completed');
});

test('Completed 상태인 아이템을 클릭하면 Active 상태로 돌아온다', async ({ firstItem }) => {
  const toggleInput = await firstItem.$('.toggle');
  await toggleInput?.click();
  await toggleInput?.click();

  const firstItemClassName = await firstItem.getAttribute('class');
  expect(firstItemClassName).not.toBe('completed');
});
