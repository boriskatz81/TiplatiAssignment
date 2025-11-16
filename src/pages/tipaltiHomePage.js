import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TipaltiHomePage extends BasePage {

    constructor(page) {
        super(page);
        this.menuIcon = 'a[href="#menu"]:not([class])';
        this.menuOptions = '//*[@id = "menu"]//div[@class="inner"]//a';
        this.menuOption = (menuName) =>  `//*[@id = "menu"]//div[@class="inner"]//a[normalize-space()="${menuName}"]`;
    }

    async retrieveAllMenuOptions() {
        await this.actions.click(this.menuIcon);
        return await this.actions.retrieveAllElementTexts(this.menuOptions);
    }

    async enterSpecificMenu(menuTitle) {
        await this.actions.click(this.menuOption(menuTitle));
    }
}