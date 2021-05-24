/**
 * @jest-environment jsdom
 */
import { pushToHistory } from '../scripts/router.js';

//test group
describe('pushToHistory settings, entry, and other', () => {
    //settings tests
    test('settings', () => {
        //get data
        let historyCurr = pushToHistory('settings', 12);
        let page = historyCurr.state.page;
        let length = historyCurr.length;

        //compare
        expect(page).toBe('settings');
        expect(length).toBe(history.length);
    });

    //entry tests
    test('entry', () => {
        //get data            
        let historyCurr = pushToHistory('entry', 5);
        let page = historyCurr.state.page;
        let length = historyCurr.length;

        //compare
        expect(page).toBe('entry5');
        expect(length).toBe(history.length);
    });

    //other/default tests
    test('other', () => {
        //get data
        let historyCurr = pushToHistory('', 69);
        let page = historyCurr.state.page;
        let length = historyCurr.length;

        //compare
        expect(page).toBe(undefined);
        expect(length).toBe(history.length);
    });
});