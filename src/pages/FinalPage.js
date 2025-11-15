import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FinalPage extends BasePage {

    constructor(page) {
        super(page);
        this.firstName = '#firstName';
        this.lastName = '#lastName';
        this.gender = (genderName) =>  `//label[contains(@for, "gender-radio") and normalize-space()="${genderName}"]`;
        this.hobbies = (hobbiesName) =>  `//label[contains(@for, "hobbies-checkbox-") and normalize-space()="${hobbiesName}"]`;

        this.state = "#state";
        this.city = "#city";
    }

    async fillName(firstName, lastName) {
        await this.actions.fill(this.firstName, firstName);
        await this.page.waitForTimeout(2000);
        await this.actions.fill(this.lastName, lastName);
        await this.page.waitForTimeout(2000);
    }

    async setGender(gender) {
            await this.actions.click(this.gender(gender));
            await this.page.waitForTimeout(2000);
            await this.actions.click(this.hobbies("Reading"));
            await this.page.waitForTimeout(2000);
    }

    async setAddress(state, city) {
         const stateLocator = await this.actions.click(this.state);
         const stateInput = await stateLocator.locator('input');
         await stateInput.fill(state);
         await this.page.waitForTimeout(1000);
         await stateInput.press("Enter");
         await this.page.waitForTimeout(2000);

         const cityLocator = await this.actions.click(this.city);
         const cityInput = await cityLocator.locator("input");
         await cityInput.fill(city);
         await this.page.waitForTimeout(1000);
         await cityInput.press("Enter");
         await this.page.waitForTimeout(2000);
    }
}