import { Page } from '@playwright/test';
import { Actions } from '../utils/Actions';

export class BasePage {
    constructor(page) {
        this.page = page;
        this.actions = new Actions(page);
    }
}