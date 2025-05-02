import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

async function getClassList(page: Page, selector: string) {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    return element ? Array.from(element.classList) : [];
  }, selector);
}

test('Basic agent form fill', async ({ page }) => {
  // Arrange
  await page.fill('#prompt', 'prompt1');

  // Act
  await page.click('#send');

  // Assert
  const name = await page.inputValue('#name');
  expect(name).toBe('Luke');

  const genderMale = await page.isChecked('#gender-male');
  const genderFemale = await page.isChecked('#gender-female');
  const genderOther = await page.isChecked('#gender-other');
  expect(genderMale).toBe(false);
  expect(genderFemale).toBe(false);
  expect(genderOther).toBe(false);

  const interestsSports = await page.isChecked('#interests-sports');
  expect(interestsSports).toBe(true);

  const favouriteAnimal = await page.inputValue('#favourite-animal');
  expect(favouriteAnimal).toBe('Cat');

  await sleep(1010);
  const toggleState = page.locator('#toggle-state');
  const toggleStateText = await toggleState.textContent();
  expect(toggleStateText).toBe('Off');
});

test('Check suggested changes state', async ({ page }) => {
  // Arrange
  await page.fill('#prompt', 'prompt1');

  let acceptButton = page.locator('button', { hasText: 'Approve' });
  let isAcceptButtonVisible = await acceptButton.isVisible();
  expect(isAcceptButtonVisible).toBe(false);

  // Act
  await page.click('#send');

  // Assert
  const nameClasses = await getClassList(page, "#name");
  expect(nameClasses).toContain('smart-changes');

  const genderMaleClasses = await getClassList(page, ".gender-male-label .MuiRadio-root");
  expect(genderMaleClasses).toContain('smart-changes');
  const genderFemaleClasses = await getClassList(page, ".gender-female-label .MuiRadio-root");
  expect(genderFemaleClasses).not.toContain('smart-changes');

  const interestsSportsClasses = await getClassList(page, ".interests-sports-label .MuiCheckbox-root");
  expect(interestsSportsClasses).toContain('smart-changes');

  const favouriteAnimalClasses = await getClassList(page, ".favourite-animal");
  expect(favouriteAnimalClasses).toContain('smart-changes');

  const smartButtonClasses = await getClassList(page, "#toggle-button");
  expect(smartButtonClasses).toContain('smart-changes');

  acceptButton = page.locator('button', { hasText: 'Approve' });
  isAcceptButtonVisible = await acceptButton.isVisible();
  expect(isAcceptButtonVisible).toBe(true);
});



test('Accept suggested changes', async ({ page }) => {
  // Arrange
  await page.fill('#prompt', 'prompt1');

  // Act
  await page.click('#send');
  await page.click('#approve');

  // Assert suggested changes not present anymore
  const nameClasses = await getClassList(page,"#name");
  expect(nameClasses).not.toContain('smart-changes');

  const genderMaleClasses = await getClassList(page,".gender-male-label .MuiRadio-root");
  expect(genderMaleClasses).not.toContain('smart-changes');
  const genderFemaleClasses = await getClassList(page,".gender-female-label .MuiRadio-root");
  expect(genderFemaleClasses).not.toContain('smart-changes');

  const interestsSportsClasses = await getClassList(page,".interests-sports-label .MuiCheckbox-root");
  expect(interestsSportsClasses).not.toContain('smart-changes');

  const favouriteAnimalClasses = await getClassList(page,".favourite-animal");
  expect(favouriteAnimalClasses).not.toContain('smart-changes');

  const smartButtonClasses = await getClassList(page, "#toggle-button");
  expect(smartButtonClasses).not.toContain('smart-changes');

  // Assert values
  const name = await page.inputValue('#name');
  expect(name).toBe('Luke');

  const genderMale = await page.isChecked('#gender-male');
  const genderFemale = await page.isChecked('#gender-female');
  const genderOther = await page.isChecked('#gender-other');
  expect(genderMale).toBe(true);
  expect(genderFemale).toBe(false);
  expect(genderOther).toBe(false);

  const interestsSports = await page.isChecked('#interests-sports');
  expect(interestsSports).toBe(true);

  const favouriteAnimal = await page.inputValue('#favourite-animal');
  expect(favouriteAnimal).toBe('Cat');

  await sleep(1010);
  const toggleState = page.locator('#toggle-state');
  const toggleStateText = await toggleState.textContent();
  expect(toggleStateText).toBe('On');
});

test('Deny suggested changes', async ({ page }) => {
  // Arrange
  await page.fill('#prompt', 'prompt1');
  await page.click('#send');
  await page.click('#approve');
  await page.fill('#prompt', 'prompt2');

  // Act
  await page.click('#send');
  await page.click('#deny');

  // Assert
  const name = await page.inputValue('#name');
  expect(name).toBe('Luke');

  const genderMale = await page.isChecked('#gender-male');
  const genderFemale = await page.isChecked('#gender-female');
  const genderOther = await page.isChecked('#gender-other');
  expect(genderMale).toBe(true);
  expect(genderFemale).toBe(false);
  expect(genderOther).toBe(false);

  const interestsSports = await page.isChecked('#interests-sports');
  expect(interestsSports).toBe(true);

  const favouriteAnimal = await page.inputValue('#favourite-animal');
  expect(favouriteAnimal).toBe('Cat');

  await sleep(1010);
  const toggleState = page.locator('#toggle-state');
  const toggleStateText = await toggleState.textContent();
  expect(toggleStateText).toBe('On');
});