import { test as base, expect, ElementHandle } from '@playwright/test';

const url = 'https://todomvc.com/examples/vanillajs/';

const test = base.extend({
  page: async ({ page }, use) => {
    const todoList = ['completed todo', 'active todo'];
    await page.goto(url);

    for (let todo of todoList) {
      await page.click('.header input');
      await page.keyboard.type(todo);
      await page.keyboard.press('Enter');
    }

    const firstItem = await page.$('.todo-list li');
    const toggleInput = await firstItem?.$('.toggle');
    await toggleInput?.click();

    await use(page);
  },
});

test('Active 버튼 클릭시 Active 상태의 아이템만 나타난다', async ({ page }) => {
  const activeFilter = await page.$('.filters a:has-text("Active")');
  await activeFilter?.click();

  const activeItems = await page.$$eval('.todo-list li', (nodes) =>
    nodes.map((node) => node.textContent)
  );

  expect(activeItems.length).toEqual(1);
  expect(activeItems[0]).toEqual('active todo');
});

test('Completed 버튼 클릭시 Completed 상태의 아이템만 나타난다', async ({ page }) => {
  const completedFilter = await page.$('.filters a:has-text("Completed")');
  await completedFilter?.click();

  const completedItems = await page.$$eval('.todo-list li', (nodes) =>
    nodes.map((node) => node.textContent)
  );

  expect(completedItems.length).toEqual(1);
  expect(completedItems[0]).toEqual('completed todo');
});

test('All 버튼 클릭시 모든 상태의 아이템이 나타난다', async ({ page }) => {
  const activeFilter = await page.$('.filters a:has-text("Active")');
  const AllFilter = await page.$('.filters a:has-text("All")');

  await activeFilter?.click();
  await AllFilter?.click();

  const allItems = await page.$$eval('.todo-list li', (nodes) =>
    nodes.map((node) => node.textContent)
  );

  expect(allItems.length).toEqual(2);
  ['completed todo', 'active todo'].forEach((todo, idx) => {
    expect(allItems[idx]).toEqual(todo);
  });
});
