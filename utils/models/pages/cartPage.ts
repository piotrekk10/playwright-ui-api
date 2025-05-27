import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartContents: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartContents = this.page.getByTestId("cart-contents-container");
    this.checkoutButton = this.cartContents.getByTestId("checkout");
  }

  async assertCheckoutButtonIsVisible() {
    await expect(this.checkoutButton).toBeVisible();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}
