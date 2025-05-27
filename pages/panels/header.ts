import { expect, Locator, Page } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly header: Locator;
  readonly shoppingCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = this.page.getByTestId("header-container");
    this.shoppingCart = this.header.getByTestId("shopping-cart-link");
  }

  async assertShoppingCart(itemCount: number) {
    const shoppingCartBadge = this.shoppingCart.getByTestId("shopping-cart-badge");
    await expect(this.shoppingCart).toBeVisible();
    if (itemCount > 0) {
      await expect(shoppingCartBadge).toBeVisible();
      await expect(shoppingCartBadge).toHaveText(itemCount.toString());
    } else {
      await expect(shoppingCartBadge).not.toBeVisible();
    }
  }

  async clickShoppingCart() {
    await this.shoppingCart.click();
  }
}
