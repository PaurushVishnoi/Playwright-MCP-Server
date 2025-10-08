import {expect} from '@playwright/test'
import dotenv from 'dotenv';
import {chromium} from '@playwright/test'
import {Given, When, Then} from '@cucumber/cucumber'

const cartItem = '[data-test="add-to-cart-sauce-labs-backpack"]'
const cartIcon = '[data-test="shopping-cart-link"]'

When('I select an item from the page', async function (n) {
  await this.page.locator(cartItem).click();

});

When('I go to the cart section', async function () {
  await this.page.locator(cartIcon).click();
});

Then('I see the added item in the cart', async function () {
  const cartItem = this.page.locator('.cart_item');
  await expect(cartItem).toBeVisible({ timeout: 20000 });
  await expect(cartItem).toContainText('Sauce Labs Backpack', { timeout: 20000 });
  await this.page.close();
});
