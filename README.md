### Partners
- Dhanvi Desu
- Annie Dai

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
    - Within a Github action that runs whenever code is pushed

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
    - No. The message feature is a very large component and likely requires many other smaller components. A unit test would be better suited for these smaller components. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
    - Yes. This is a much more specific feature and is likely one of the smaller components aforementioned. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
    - The tests will run without a browser UI

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
    - beforeAll(async() => {
        await page.goto('http://127.0.0.1:5500');
        await page.waitForTimeout(500);
        await page.click('header > img');
    });


Screenshots in Screenshots folder

