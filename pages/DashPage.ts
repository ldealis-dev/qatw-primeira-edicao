import { Page } from "@playwright/test";

export class DashPage {
    page: Page;
    constructor(page: Page) {
        this.page = page
    }

    async getAccountBallance() {
        return this.page.locator('#account-balance')
    }
}