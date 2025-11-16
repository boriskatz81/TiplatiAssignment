const BaseDriver = require('../src/utils/BaseDriver');
const { TipaltiHomePage } = require('../src/pages/tipaltiHomePage');
const { ContactDetailsPage } = require('../src/pages/contactDetailsPage');
const { test, expect } = require('@playwright/test');

test.describe('Tipalti Test', () => {

    test.beforeEach(async () => {
        await BaseDriver.setUp();
    });

    test.afterEach(async () => {
        await BaseDriver.tearDown();
    });

    test('Test 1 - Testing Tipalti Home Page', async () => {
        await BaseDriver.page.goto('https://qa-tipalti-assignment.tipalti-pg.com/index.html');
        const tipaltiHomePage = new TipaltiHomePage(BaseDriver.page);

        const menuData = await tipaltiHomePage.retrieveAllMenuOptions();
        const expectedData = ["Home", "Kika", "Lychee", "Kimba"]
        await compareExpectedWithActual(expectedData, menuData);

        await tipaltiHomePage.enterSpecificMenu("Lychee");

        const contactDetailsPage = new ContactDetailsPage(BaseDriver.page);
        await contactDetailsPage.fillName("Boris Kats");
        await contactDetailsPage.fillEmail("borisgkatz@gmail.com");
        await contactDetailsPage.fillMessage("This is My Favorite dog ever!!!");
        await BaseDriver.page.waitForTimeout(10000);
        await contactDetailsPage.clickOnSend();
        await BaseDriver.page.waitForTimeout(10000);

    });

    async function compareExpectedWithActual(expectedData, actualData) {
          const errList = [];

          for (let i=0; i < expectedData.length; i++) {
              if (expectedData[i] != actualData[i]) {
                  errList.push(`${expectedData[i]} != ${actualData[i]}`);
              }
              else {
                  process.stdout.write(`${expectedData[i]} = ${actualData[i]}` + "\n");
              }
          }
          if (errList.length > 0) {
             console.error("Differences found:\n" + errList.join("\n"));
             expect(errList.length, errList.join("\n")).toBe(0);
          }

    }

});