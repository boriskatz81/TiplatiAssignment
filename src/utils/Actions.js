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

    async click(selector) {
        const element = await this.getLocator(selector);
        await element.click();
        return element;
    }

    async fill(selector, text) {
        const element = await this.getLocator(selector);
        await element.fill(text);
    }




    async getText(selector) {
         const locator = await this.getLocator(selector);
         return await locator.textContent();
    }

    async getAttribute(selector, attribute) {
         const locator = await this.getLocator(selector);
         return await locator.getAttribute(attribute);
    }

    async selectByIndex(selector, index) {
         const locator = await this.getLocator(selector);
         await locator.selectOption({ index: parseInt(index) });
    }

    async selectByText(selector, text) {
          const locator = await this.getLocator(selector);
          await locator.selectOption({ label: text });
    }

    async selectByPartialText(selector, partialText) {
          const locator = await this.getLocator(selector);
          const options = await locator.locator('option').allTextContents();
          const match = options.find(opt => opt.includes(partialText));
          if (match) {
               await locator.selectOption({ label: match });
          } else {
               throw new Error(`No option containing "${partialText}" found in ${selector}`);
          }
    }

   async check(selector) {
        const locator = await this.getLocator(selector);
        if (!(await locator.isChecked())) {
            await locator.check();
        }
   }

   async uncheck(selector) {
       const locator = await this.getLocator(selector);
       if (await locator.isChecked()) {
            await locator.uncheck();
      }
   }

  async selectRadioByValue(selector, value) {
        const locator = await this.getLocator(selector);
        await locator.locator(`input[type="radio"][value="${value}"]`).check();
  }

  async retrieveTableData(selector) {
       const tableJson = [];
       const table = await this.getLocator(selector);
       const headers = await table.locator('tbody th').allTextContents();
       const rows = await table.locator('tbody tr');
       const rowCount = await rows.count();
       for (let j=0; j<rowCount; j++) {
           const cells = await rows.nth(j).locator('td').allTextContents({ timeout: 1000 });
           if (cells.length == 0) {
               continue;
           }
           const rowData = {};
           for (let i=0 ; i<cells.length; i++){
               rowData[headers[i]] = cells[i];
           }
           tableJson.push(rowData);
       }
       return tableJson;
  }
}