import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', {waitUntil: "commit"});
});

async function checkVisible(page: Page) {
  await expect(page.locator('#gender-male')).toBeVisible();
  await expect(page.locator('#gender-female')).toBeVisible();
  await expect(page.locator('#gender-other')).toBeVisible();
  await expect(page.locator('#gender-male-fake')).not.toBeVisible();
  await expect(page.locator('#gender-female-fake')).not.toBeVisible();
  await expect(page.locator('#gender-other-fake')).not.toBeVisible();
}

test.describe('Radio tests', () => {
  test('Suggested changes correct', async ({ page }) => {
    // Arrange
    await page.click('#gender-female')
    await page.fill('#prompt', 'promptRadio');

    // Act
    await page.click('#send');

    //Assert
    await expect(page.locator('#gender-male')).not.toBeChecked();
    await expect(page.locator('#gender-female')).toBeChecked();
    await expect(page.locator('#gender-other')).not.toBeChecked();

    // Javascript checked state doesn't change for fake radios, the state is asserted via the ckecked attribute instead
    const genderMaleFakeChecked = await page.locator('#gender-male-fake').getAttribute('checked');
    const genderFemaleFakeChecked = await page.locator('#gender-female-fake').getAttribute('checked');
    const genderOtherFakeChecked = await page.locator('#gender-other-fake').getAttribute('checked');
    expect(genderMaleFakeChecked).not.toBeNull()
    expect(genderFemaleFakeChecked).toBeNull()
    expect(genderOtherFakeChecked).toBeNull()
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

    await checkVisible(page);
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

    await checkVisible(page);
  });

  test('Change suggested changes and approve', async ({ page }) => {
    // Arrange
    await page.click('#gender-female')
    await page.fill('#prompt', 'promptRadio');
    await page.click('#send');

    // Act
    await page.click('#gender-other-fake')
    await page.click('#approve');

    //Assert
    await expect(page.locator('#gender-male')).not.toBeChecked();
    await expect(page.locator('#gender-female')).not.toBeChecked();
    await expect(page.locator('#gender-other')).toBeChecked();

    await checkVisible(page);
  });

  test('Change suggested changes and deny', async ({ page }) => {
    // Arrange
    await page.click('#gender-female')
    await page.fill('#prompt', 'promptRadio');
    await page.click('#send');

    // Act
    await page.click('#gender-other-fake')
    await page.click('#deny');

    //Assert
    await expect(page.locator('#gender-male')).not.toBeChecked();
    await expect(page.locator('#gender-female')).not.toBeChecked();
    await expect(page.locator('#gender-other')).toBeChecked();

    await checkVisible(page);
  });
});