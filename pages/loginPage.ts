import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginBox = this.page.locator(".login-box");
  }

  async goto() {
    await this.page.goto("/");
  }

  async fillUsernameInput(username: string) {
    await this.loginBox.getByTestId("username").fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.loginBox.getByTestId("password").fill(password);
  }

  async clickLoginButton() {
    await this.loginBox.getByTestId("login-button").click();
  }
}
