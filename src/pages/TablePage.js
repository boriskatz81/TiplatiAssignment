import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablePage extends BasePage {

    constructor(page) {
        super(page);
        this.table = 'table[id="customers"]';
    }

    async retrieveTableData() {
        return await this.actions.retrieveTableData(this.table);
    }
}