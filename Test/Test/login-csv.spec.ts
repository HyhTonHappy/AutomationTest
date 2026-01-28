import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { LoginData, readFileFromCsv } from '../utils/csvReader';
test.describe("Test Login from CSV", () => {
    let testData : LoginData[] = [];
    test.beforeAll(async () => {
        testData = await readFileFromCsv();
        console.log(`Đã load ${testData.length} bộ dữ liệu từ CSV`);

        })
    
        test("Test Data", async ({page}) => {
            for(let data of testData){
                const loginPage = new LoginPage(page);
                await loginPage.login(data.username, data.password);
                const isSuccess = await loginPage.isLoginSuccessful();
                if(data.result_expected === "success"){
                    expect(isSuccess).toBeTruthy();
                } else {
                    expect(isSuccess).toBeFalsy();
                }
            }
        })
    })
