import {Page} from "@playwright/test";

export const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
);

export async function getClassList(page: Page, selector: string) {
    return await page.evaluate((sel) => {
        const element = document.querySelector(sel);
        return element ? Array.from(element.classList) : [];
    }, selector);
}