describe('Basic user flow for SPA ', () => {
    beforeAll(async() => {
        await page.goto('http://127.0.0.1:5500');
        await page.waitForTimeout(500);
    });

    // test 1 is given
    it('Test1: Initial Home Page - Check for 10 Journal Entries', async() => {
        const numEntries = await page.$$eval('journal-entry', (entries) => {
            return entries.length;
        });
        expect(numEntries).toBe(10);
    });

    // test 2 is given
    // it('Test2: Make sure <journal-entry> elements are populated', async () => {
    //   let allArePopulated = true;
    //   let data, plainValue;
    //   const entries = await page.$$('journal-entry');
    //   for (let i = 0; i < entries.length; i++) {
    //     data = await entries[i].getProperty('entry');
    //     plainValue = await data.jsonValue();
    //     if (plainValue.title.length == 0) { allArePopulated = false; }
    //     if (plainValue.date.length == 0) { allArePopulated = false; }
    //     if (plainValue.content.length == 0) { allArePopulated = false; }
    //   }
    //   expect(allArePopulated).toBe(true);
    // }, 30000);

    it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async() => {
        //click on element to naviagate  
        await page.click('journal-entry');

        //get data
        let url = page.url();

        //compare
        expect(url).toBe('http://127.0.0.1:5500/#entry1');
    });

    it('Test4: On first Entry page - checking page header title', async() => {
        //get data
        let title = await page.$eval('header > h1', (h1) => {
            return h1.innerHTML;
        });

        //compare
        expect(title).toBe('Entry 1');
    });

    it('Test5: On first Entry page - checking <entry-page> contents', async() => {
        //get data from page
        let entryPage = await page.$('entry-page');
        let temp = await entryPage.getProperty('entry')
        let entryData = await temp.jsonValue();

        //compare
        expect(entryData.title).toBe('You like jazz?');
        expect(entryData.date).toBe('4/25/2021');
        expect(entryData.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
        expect(entryData.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
        expect(entryData.image.alt).toBe('bee with sunglasses');

    }, 10000);

    it('Test6: On first Entry page - checking <body> element classes', async() => {
        //get class data
        let classes = await page.$eval('body', (body) => {
            return body.classList;
        });

        //compare classes
        for (let i = 0; i < classes.length; i++) {
            expect(classes[i]).toBe('single-entry');
        }
    });

    it('Test7: Clicking the settings icon, new URL should contain #settings', async() => {
        //navigate by clicking and get url data
        await page.click('header img');
        let url = await page.url();

        //compare
        expect(url).toBe('http://127.0.0.1:5500/#settings');
    });

    it('Test8: On Settings page - checking page header title', async() => {
        //get title data 
        let title = await page.$eval('header > h1', (h1) => {
            return h1.innerHTML;
        });

        //compare
        expect(title).toBe('Settings');
    });

    it('Test9: On Settings page - checking <body> element classes', async() => {
        //get class data
        let classes = await page.$eval('body', (body) => {
            return body.classList;
        });

        //compare classes
        for (let i = 0; i < classes.length; i++) {
            expect(classes[i]).toBe('settings');
        }
    });

    it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
        //navigate back
        await page.goBack();

        //get data
        let url = page.url();

        //compare
        expect(url).toBe('http://127.0.0.1:5500/#entry1');
    });

    it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
        //navigate back
        await page.goBack();

        //get data
        let url = page.url();

        //compare
        expect(url).toBe('http://127.0.0.1:5500/');
    });

    it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async() => {
        //get title data
        let title = await page.$eval('h1', (h1) => {
            return h1.innerHTML;
        });

        //compare
        expect(title).toBe('Journal Entries');
    });

    it('Test13: On the home page the <body> element should not have any class attribute', async() => {
        //get class data
        let classes = await page.$eval('body', (body) => {
            return body.classList.length;
        });

        //get number
        let number = classes.length;

        //compare
        expect(classes).toBe(0);
    });

    it('Test14: Verify the url is correct when clicking on the second entry', async() => {
        //get data
        let entries = await page.$$('journal-entry');

        //navigate
        await entries[1].click();

        //get data
        let url = await page.url();

        //compare
        expect(url).toBe('http://127.0.0.1:5500/#entry2');
    });


    it('Test15: Verify the title is current when clicking on the second entry', async() => {
        //get title data
        let title = await page.$eval('h1', (h1) => {
            return h1.innerHTML;
        });

        //compare
        expect(title).toBe('Entry 2');
    });


    it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
        //get data from page  
        let entryPage = await page.$('entry-page');
        let temp = await entryPage.getProperty('entry');
        let entryData = await temp.jsonValue();

        //compare
        expect(entryData.title).toBe('Run, Forrest! Run!');
        expect(entryData.date).toBe('4/26/2021');
        expect(entryData.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
        expect(entryData.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
        expect(entryData.image.alt).toBe('forrest running');
        expect(entryData.audio).toBeUndefined();
    });


    it('Test17: Clicking the back button once should bring the user back to the home page', async() => {
        //navigate back
        await page.goBack();

        //get data
        let url = page.url();

        //compare
        expect(url).toBe('http://127.0.0.1:5500/');
    });

    it('Test18: Verify the url is correct when clicking on the fifth entry', async() => {
        //get data
        let entries = await page.$$('journal-entry');

        //navigate
        await entries[4].click();

        //get data
        let url = await page.url();

        //compare
        expect(url).toBe('http://127.0.0.1:5500/#entry5');
    });

    it('Test19: Verify the title is current when clicking on the fifth entry', async() => {
        //get title data
        let title = await page.$eval('h1', (h1) => {
            return h1.innerHTML;
        });

        //compare
        expect(title).toBe('Entry 5');
    });

    it('Test20: Clicking the settings icon from the fifth entry, new URL should contain #settings', async() => {
        //navigate by clicking and get url data
        await page.click('header img');
        let url = await page.url();

        //compare
        expect(url).toBe('http://127.0.0.1:5500/#settings');
    });
});