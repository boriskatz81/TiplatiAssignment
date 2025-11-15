import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class WikipediaPage extends BasePage {

    constructor(page) {
        super(page);
        this.searchTextBox = '#searchInput';
        this.searchOption = (filmName) => `li[role="option"][title*="${filmName}"]`;
    }

    async writeIntoSearchBox(textToWrite) {
        await this.actions.fill(this.searchTextBox, textToWrite);
    }

    async clickOnSelectedOption(filmName) {
        await this.actions.click(this.searchOption(filmName));
    }
}