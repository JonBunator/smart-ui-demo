import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', {waitUntil: "commit"});
});

test.describe('Radio tests', () => {
  test('Suggested changes correct', async ({ page }) => {
    // Arrange
    await page.click('#gender-female')
    await page.fill('#prompt', 'promptRadio');

    // Act
    await page.click('#send');

    //Assert
    await expect(page.locator('#gender-male')).toBeChecked();
    await expect(page.locator('#gender-female')).not.toBeChecked();
    await expect(page.locator('#gender-other')).not.toBeChecked();
  });

  test('Approve suggested changes', async ({ page }) => {
    // Arrange
    await page.click('#gender-female')
    await page.fill('#prompt', 'promptRadio');
    await page.click('#send');

    // Act
    await page.click('#approve');

    //Assert
    await expect(page.locator('#gender-male')).toBeChecked();
    await expect(page.locator('#gender-female')).not.toBeChecked();
    await expect(page.locator('#gender-other')).not.toBeChecked();
  });

  test('Deny suggested changes', async ({ page }) => {
    // Arrange
    await page.click('#gender-female')
    await page.fill('#prompt', 'promptRadio');
    await page.click('#send');

    // Act
    await page.click('#deny');

    //Assert
    await expect(page.locator('#gender-male')).not.toBeChecked();
    await expect(page.locator('#gender-female')).toBeChecked();
    await expect(page.locator('#gender-other')).not.toBeChecked();
  });

  test('Change suggested changes and approve', async ({ page }) => {
    // Arrange
    await page.click('#gender-female')
    await page.fill('#prompt', 'promptRadio');
    await page.click('#send');

    // Act
    await page.click('#gender-other')
    await page.click('#approve');

    //Assert
    await expect(page.locator('#gender-male')).not.toBeChecked();
    await expect(page.locator('#gender-female')).not.toBeChecked();
    await expect(page.locator('#gender-other')).toBeChecked();
  });

  test('Change suggested changes and deny', async ({ page }) => {
    // Arrange
    await page.click('#gender-female')
    await page.fill('#prompt', 'promptRadio');
    await page.click('#send');

    // Act
    await page.click('#gender-other')
    await page.click('#deny');

    //Assert
    await expect(page.locator('#gender-male')).not.toBeChecked();
    await expect(page.locator('#gender-female')).not.toBeChecked();
    await expect(page.locator('#gender-other')).toBeChecked();
  });
});