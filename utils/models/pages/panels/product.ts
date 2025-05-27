import { expect, Locator, Page } from "@playwright/test";
import { ProductDataType } from "../../../data/products";

export class Product {
  readonly page: Page;
  readonly type: string;
  readonly list: Locator;
  readonly inventoryItem: Locator;

  constructor(page: Page, type: "inventory" | "cart") {
    this.page = page;
    this.type = type;
    this.list = this.page.getByTestId(`${this.type}-list`);
    this.inventoryItem = this.list.getByTestId("inventory-item");
  }

  async goto() {
    await this.page.goto("/inventory.html");
  }

  async assertProduct({
    item,
    buttonType,
  }: {
    item: ProductDataType;
    buttonType?: "add" | "remove";
  }) {
    const product = this.inventoryItem.filter({ hasText: item.name });
    const itemName = product.getByTestId("inventory-item-name");
    const itemDescription = product.getByTestId("inventory-item-desc");
    const itemPrice = product.getByTestId("inventory-item-price");
    const itemButton = product.getByTestId(
      buttonType === "remove" ? /remove-.*/ : /add-to-cart-.*/
    );
    await expect(itemName).toBeVisible();
    await expect(itemName).toHaveText(item.name);
    await expect(itemDescription).toBeVisible();
    await expect(itemDescription).toHaveText(item.description);
    await expect(itemPrice).toBeVisible();
    await expect(itemPrice).toHaveText(`$${item.price}`);
    await expect(itemButton).toBeVisible();
    await expect(itemButton).toHaveText(
      buttonType === "remove" ? "Remove" : "Add to cart"
    );
    if (this.type === "cart") {
      const quantity = product.getByTestId("item-quantity");
      await expect(quantity).toBeVisible();
      await expect(quantity).toHaveText("1");
    }
  }

  async clickItemButton({
    item,
    buttonType,
  }: {
    item: ProductDataType;
    buttonType: "add" | "remove";
  }) {
    const product = this.inventoryItem.filter({ hasText: item.name });
    const itemButton = product.getByTestId(
      buttonType === "remove" ? /remove-.*/ : /add-to-cart-.*/
    );
    await itemButton.click();
  }

  async inventoryItemIsNotVisible() {
    await expect(this.inventoryItem).not.toBeVisible();
  }
}
