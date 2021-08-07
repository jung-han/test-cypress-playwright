import { test as base, expect, ElementHandle } from '@playwright/test';

const url = 'https://todomvc.com/examples/vanillajs/';

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto(url);
    await use(page);
  },
});

test('초기값은 0이다', async ({ page }) => {
  const count = await page.$eval('footer .todo-count strong', (node) => node.textContent);

  expect(count).toEqual('0');
});

test('투두 추가시 잔여 item이 증가한다', async ({ page }) => {
  await page.click('.header input');
  await page.keyboard.type('todo 1');
  await page.keyboard.press('Enter');

  const count = await page.$eval('footer .todo-count strong', (node) => node.textContent);
  expect(count).toEqual('1');
});

test('투두 완료시 잔여 item이 감소한다', async ({ page }) => {
  await page.click('.header input');
  await page.keyboard.type('todo 1');
  await page.keyboard.press('Enter');

  const firstItem = await page.$('.todo-list li');
  const toggleInput = await firstItem?.$('.toggle');
  await toggleInput?.click();

  const count = await page.$eval('footer .todo-count strong', (node) => node.textContent);
  expect(count).toEqual('0');
});
