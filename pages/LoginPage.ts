import { Locator, Page } from "@playwright/test";
export class LoginPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async visitPage() {
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async fillCpf(cpf: string) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fillPassword(password: string) {
        for (const digit of password) {
            await this.page.getByRole('button', { name: digit }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fill2FACode(code: string) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(code);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }
    async getErrorMessage() {
        return this.page.locator('span')
    }
}