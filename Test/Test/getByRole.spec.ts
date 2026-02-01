import {test, expect, Page} from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { highlightAndScreenshot } from '../utils/screenshot'

test.describe("Test getByRole với GTML local", () => {
    // setup load file HTML truớc mỗi testcase
    test.beforeEach(async ({page}) => {
        // B1: đọc file HTML từ folder public
        const htmlPath = join(__dirname, "..", "public", "index.html")
        // B2:  set file HTML vào page playwright
        const htmlContent = readFileSync(htmlPath, "utf-8")
        await page.setContent(htmlContent, {waitUntil: 'domcontentloaded'})

    })
    // test case 1: button
    test("Test button", async({page}) => {
        const submitBtn = page.getByRole('button', {name: 'Submit'})
        await expect(submitBtn).toBeVisible();
        const cancelBtn = page.getByRole('button', {name: 'Cancel'})
        await expect(cancelBtn).toBeVisible();

        const usernameInput = page.getByRole('textbox', {name: "username"});
        await expect(usernameInput).toBeVisible();
        await page.waitForTimeout(2000)
    })
    test("dropdown select", async({page}) => {
        const countrySelect = page.getByRole("combobox", {name: "country"})
        await highlightAndScreenshot(page, countrySelect, "getByRole", "countrySelect")
        await expect(countrySelect).toBeVisible();

        await countrySelect.selectOption({label: "Vietnam"})
        await expect(countrySelect).toHaveValue("vn")

        await page.waitForTimeout(2000)
    })

    test("Test checkbox", async ({page}) => {
        const agreeCheckbox = page.getByRole("checkbox", {name: "agree"})
        await expect(agreeCheckbox).toBeVisible();

        await agreeCheckbox.check();
        await expect(agreeCheckbox).toBeChecked()
    })
    test("Test radio", async ({page}) => {
        const maleRadio = page.getByRole("radio", {name: "male"}).first()
        await expect(maleRadio).toBeVisible();

        maleRadio.check()
        await expect(maleRadio).toBeChecked();
    })

    test("Test table", async ({page}) => {
        const table = page.getByRole("table")
        // kiểm tra data trong table
        const johnRow = table.getByRole("cell", {name: "John Doe"})
        const rows = table.getByRole("row")
        let countRow = await rows.count()
        await expect(countRow).toBe(4)
    })

    test("Test link", async({page}) => {
        const navigation = page.getByRole("navigation")
        await expect(navigation).toBeVisible();

        const homeLink = navigation.getByRole("link").filter({hasText: "Home"}).first()
        await expect(homeLink).toBeVisible();

    })
})

