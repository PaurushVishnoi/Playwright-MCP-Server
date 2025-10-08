import {expect} from '@playwright/test'
import dotenv from 'dotenv';
import {chromium} from '@playwright/test'
import {Given, When, Then} from '@cucumber/cucumber'

dotenv.config()

let page
let textToCheck = ''


const loginUserName = '#user-name'
const loginPassword = '#password'
const loginErrorElement = 'h3[data-test="error"]'
const productPageHeaderElement = '#header_container .header_label .app_logo'
const cartItem = '[data-test="add-to-cart-sauce-labs-backpack"]'
const cartIcon = '[data-test="shopping-cart-link"]'
const addedItemInCart = '[data-test="inventory_item_name"]'

const baseURL = process.env.UI_baseURL
const exmoxUserNameValue = process.env.exmox_USERNAME;
const exmoxPasswordValue = process.env.exmox_PASSWORD;

Given('I am on login page for Sauce Labs', {timeout: 80 * 2000}, async function() {  
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto(baseURL, {timeout: 80 * 2000} )
    await expect(page.locator(loginUserName)).toBeVisible({timeout: 20 * 1000})
    await expect(page.locator(loginPassword)).toBeVisible({timeout: 20 * 1000})
})

When('I enter incorrect credentials', async function() {
    await page.fill(loginUserName, exmoxUserNameValue)
    await page.fill(loginPassword, 'wrongpassword')
    await page.click('#login-button')
})

When('I enter correct credentials', {timeout: 80 * 2000}, async function() {
    await page.fill(loginUserName, exmoxUserNameValue)
    await page.fill(loginPassword, exmoxPasswordValue)
    await page.click('#login-button')
})

Then('I see error message', {timeout: 80 * 2000}, async function() {
    const error = page.locator(loginErrorElement)
    await expect(error).toBeVisible({ timeout: 20 * 1000 });
    await expect(error).toContainText('Epic sadface: Username and password do not match any user in this service', { timeout: 20 * 1000 });
    await page.close()
})

Then('I see Sauce Labs product page', {timeout: 80 * 2000}, async function() {
    const title = page.locator(productPageHeaderElement)
    await expect(title).toBeVisible({ timeout: 20 * 1000 });
    await expect(page.locator(cartIcon)).toBeVisible({ timeout: 20 * 1000 });
    await expect(title).toContainText('Swag Labs', { timeout: 20 * 1000 });
    await page.close()
})

// Cart functionality step definitions
Given('I am on the products page', async function() {
    // This step assumes user is already logged in and on products page
    const title = page.locator(productPageHeaderElement)
    await expect(title).toBeVisible({ timeout: 20 * 1000 });
    await expect(title).toContainText('Swag Labs', { timeout: 20 * 1000 });
})

When('I add {string} to the cart', async function(productName) {
    if (productName === 'Sauce Labs Backpack') {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]')
    } else if (productName === 'Sauce Labs Bike Light') {
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]')
    } else if (productName === 'Sauce Labs Bolt T-Shirt') {
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    }
    // Add small wait to ensure cart updates
    await page.waitForTimeout(500)
})

When('I go to the cart section', async function() {
    await page.click(cartIcon)
    await page.waitForLoadState('networkidle')
})

Then('I see {string} in the cart', async function(productName) {
    const cartItem = page.locator('.cart_item')
    await expect(cartItem).toBeVisible({ timeout: 20 * 1000 })
    await expect(cartItem).toContainText(productName, { timeout: 20 * 1000 })
})

Then('the cart badge shows {string} item', async function(itemCount) {
    const cartBadge = page.locator('.shopping_cart_badge')
    await expect(cartBadge).toBeVisible({ timeout: 10 * 1000 })
    await expect(cartBadge).toContainText(itemCount, { timeout: 10 * 1000 })
})

Then('the cart badge shows {string} items', async function(itemCount) {
    const cartBadge = page.locator('.shopping_cart_badge')
    await expect(cartBadge).toBeVisible({ timeout: 10 * 1000 })
    await expect(cartBadge).toContainText(itemCount, { timeout: 10 * 1000 })
})

