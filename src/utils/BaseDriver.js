const { chromium } = require('playwright');

class BaseDriver {
    static browser = null;
    static context = null;
    static page = null;

    static async setUp(headless = false) {
        await this.tearDown();
        this.browser = await chromium.launch({
            headless,
            args: [
                '--no-sandbox',
                '--disable-extensions',
                '--start-maximized'
            ],
        });

        this.context = await this.browser.newContext({
            viewport: null,
            locale: 'en-US',
        });

        this.page = await this.context.newPage();
    }

    static async tearDown() {
        if (this.browser) {
            await this.browser.close();
        }
        this.browser = null;
        this.context = null;
        this.page = null;
    }
}

module.exports = BaseDriver;