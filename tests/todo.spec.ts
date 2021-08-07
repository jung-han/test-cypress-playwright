import { test as base, expect, ElementHandle } from '@playwright/test';

const url = 'https://todomvc.com/examples/vanillajs/';

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto(url);
    await use(page);
  },
});

test('header의 input에 값을 입력한 뒤 엔터를 누르면 투두가 추가된다.', async ({ page }) => {
  // for tracing
  // const ctx = await browser.newContext();
  // await ctx.tracing.start({ screenshots: true, snapshots: true });

  await page.click('.header input');
  await page.keyboard.type('todo 1');
  await page.keyboard.press('Enter');

  const list = await page.$$eval('.todo-list li', (nodes) => nodes.map((node) => node.textContent));
  expect(list.length).toEqual(1);
  expect(list[0]).toEqual('todo 1');

  // await ctx.tracing.stop({ path: 'trace.zip' });
});
