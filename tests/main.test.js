const BaseDriver = require('../src/utils/BaseDriver');
const { WikipediaPage } = require('../src/pages/wikipediaPage');
const { TablePage } = require('../src/pages/TablePage');
const { FinalPage } = require('../src/pages/FinalPage');
const { test, expect } = require('@playwright/test');

test.describe('Example Test Suite', () => {

    test.beforeEach(async () => {
        await BaseDriver.setUp();
    });

    test.afterEach(async () => {
        await BaseDriver.tearDown();
    });

    test('Test 1 - Open Wikipedia', async () => {
        await BaseDriver.page.goto('https://en.wikipedia.org/wiki/Main_Page');
        const wikipediaPage = new WikipediaPage(BaseDriver.page);
        await wikipediaPage.writeIntoSearchBox("Bloodsport");
        await wikipediaPage.clickOnSelectedOption("Bloodsport (film)");

    });

    test('Test 2 - Retrieve Table Data', async () => {
        await BaseDriver.page.goto('https://www.w3schools.com/html/html_tables.asp', { waitUntil: 'domcontentloaded', timeout: 120000 });

        const tablePage = new TablePage(BaseDriver.page);
        const tableData = await tablePage.retrieveTableData();
        tableData.sort((a, b) => {
            const companyA = a.Company ? a.Contact.toUpperCase() : '';
            const companyB = b.Company ? b.Contact.toUpperCase() : '';

            if (companyA < companyB) return -1;
            if (companyA > companyB) return 1;
            return 0;
        });


        process.stdout.write("Totally Found " +  tableData.length +"\n");
        for (let i=0; i< tableData.length; i++) {
            const row = tableData[i];
            process.stdout.write("Row: " + i.toString() +"\n");
            for (const key in row) {
                process.stdout.write(`${key}: ${row[key]}` +"\n");
            }
            process.stdout.write("------------\n");
        }
    });

    test('Test 3 - Open StackOverflow', async () => {
        // Just checking some stuff
        await BaseDriver.page.goto('https://demoqa.com/automation-practice-form' , { waitUntil: 'domcontentloaded', timeout: 120000 });
        const finalPage = new FinalPage(BaseDriver.page);
        await finalPage.fillName("Boris" , "Katz");
        await finalPage.setGender("Male");
        await finalPage.setAddress("Haryana", "Panipat");


       // const title = await BaseDriver.page.title();
       // expect(title).toContain('Stack Overflow');

                const fruits = ['banana', 'apple', 'cherry'];
                fruits.sort();  // default: ascending (alphabetical)
                console.log(fruits); // ["apple", "banana", "cherry"]
                fruits.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

                const numbers = [10, 5, 20, 1];
                numbers.sort((a, b) => a - b); // ascending
                console.log(numbers); // [1, 5, 10, 20]

                numbers.sort((a, b) => b - a); // descending
                console.log(numbers); // [20, 10, 5, 1]

                const jsonList = [];
                jsonList.push({ Company: "Apple", Contact: "Tim Cook", Country: "USA" });
                jsonList.push({ Company: "Microsoft", Contact: "Satya Nadella", Country: "USA" });
                jsonList.push({ Company: "Google", Contact: "Sundar Pichai", Country: "USA" });

                const jsonList2 = [];
                jsonList2.push({ Company: "Applee", Contact: "Tim Cook", Country: "USA" });
                jsonList2.push({ Company: "Microsoft", Contact: "Satya Nadella", Country: "USA" });
                jsonList2.push({ Company: "Googlee", Contact: "Sundar Pichai", Country: "USA" });

                for (let i=0; i<= jsonList.length; i++) {
                    await compareExpectedWithActual(jsonList[i], jsonList[i] , i);
                }

                for (let i=0; i< jsonList.length; i++) {
                    await compareExpectedWithActual(jsonList[i], jsonList2[i] , i);
                }
    });

    async function compareExpectedWithActual(expectedData, actualData, index) {
          const errList = [];

          for (const key in expectedData) {
              if (expectedData[key] != actualData[key]) {
                  errList.push(`${index} : ${key} -> ${expectedData[key]} != ${actualData[key]}`);
              }
              else {
                  process.stdout.write(`${index} : ${key} -> ${expectedData[key]} = ${actualData[key]}` + "\n");
              }
          }
          if (errList.length > 0) {
             console.error("Differences found:\n" + errList.join("\n"));
             expect(errList.length, errList.join("\n")).toBe(0);
          }

    }

});