import { UserDataType, USERS } from "@data/users";
import { LoginPage } from "@pages";
import { Browser, chromium, Page, test as setup } from "@playwright/test";

setup("authenticate users", async () => {
  const browser = await chromium.launch({ headless: true });
  for (const user of USERS) {
    await authenticateAsUser(browser, user);
  }
});

const authenticateAsUser = async (browser: Browser, user: UserDataType) => {
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsernameInput(user.username);
  await loginPage.fillPasswordInput(user.password);
  await loginPage.clickLoginButton();
  await context.storageState({ path: user.file });
};
