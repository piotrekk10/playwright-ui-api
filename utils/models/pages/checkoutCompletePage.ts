import { expect, Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly checkoutComplete: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutComplete = this.page.getByTestId(
      "checkout-complete-container"
    );
    this.completeHeader = this.checkoutComplete.getByTestId("complete-header");
    this.completeText = this.checkoutComplete.getByTestId("complete-text");
  }

  async assertCheckoutComplete() {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
    await expect(this.completeText).toBeVisible();
    await expect(this.completeText).toHaveText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  }
}
