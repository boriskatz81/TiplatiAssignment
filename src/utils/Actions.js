import { Page, Locator } from '@playwright/test';

export class Actions {
    constructor(page) {
        this.page = page;
        this.timeout = 30000
    }


    async getLocator(selector) {
            const locator = this.page.locator(selector);
            await locator.waitFor({ state: 'attached', timeout: this.timeout });
            await locator.waitFor({ state: 'visible', timeout: this.timeout });

            await this.page.waitForFunction(
                    (el) => el && !el.disabled,
                    await locator.elementHandle(),
                    { timeout: this.timeout }
                );

            await locator.scrollIntoViewIfNeeded();
            return locator;
        }

    async retrieveAllElementTexts(selector) {
         return await this.page.locator(selector).allTextContents();
    }

    async click(selector) {
        const element = await this.getLocator(selector);
        await element.click();
        return element;
    }

    async fill(selector, text) {
        const element = await this.getLocator(selector);
        await element.fill(text);
    }
}