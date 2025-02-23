import { test, expect, Locator } from '@playwright/test';

import { get2FACode } from '../support/db';

import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';
import { cleanJobs, getJob } from '../support/redis';

interface User {
    cpf: string,
    senha: string,
}

test('should not login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usuario: User = {
        cpf: '00000014141',
        senha: '147257'
    }
    await loginPage.visitPage();
    await loginPage.fillCpf(usuario.cpf);
    await loginPage.fillPassword(usuario.senha);
    await expect(await loginPage.getErrorMessage()).toContainText('Acesso negado. Por favor, tente novamente.');

});


test('should not login with invalid two-factor code', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const usuario: User = {
        cpf: '00000014141',
        senha: '147258'
    }
    await loginPage.visitPage();
    await loginPage.fillCpf(usuario.cpf);
    await loginPage.fillPassword(usuario.senha);
    await loginPage.fill2FACode('123456');
    await expect(await loginPage.getErrorMessage()).toContainText('Código inválido. Por favor, tente novamente.');
});

test('should login with valid password and valid two-factor code', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const dashPage = new DashPage(page);

    const usuario: User = {
        cpf: '00000014141',
        senha: '147258'
    }
    await cleanJobs();
    await loginPage.visitPage();
    await loginPage.fillCpf(usuario.cpf);
    await loginPage.fillPassword(usuario.senha);

    await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({ timeout: 3000 })

    // const code = await get2FACode(usuario.cpf);
    const code = await getJob();
    await loginPage.fill2FACode(code);

    await expect(await dashPage.getAccountBallance()).toHaveText('R$ 5.000,00');

});