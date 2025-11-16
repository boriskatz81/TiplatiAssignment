import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactDetailsPage extends BasePage {

    constructor(page) {
        super(page);
        this.name = '#name';
        this.email = '#email';
        this.message = '#message';
        this.sendButton = "input[type='submit'][value='Send']"
    }

    async fillName(name) {
        await this.actions.fill(this.name, name);
    }

    async fillEmail(email) {
         await this.actions.fill(this.email, email);
    }

    async fillMessage(message) {
         await this.actions.fill(this.message, message);
    }

    async clickOnSend() {
          await this.actions.click(this.sendButton);
    }
}