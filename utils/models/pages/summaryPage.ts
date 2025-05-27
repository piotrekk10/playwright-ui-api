import { expect, Locator, Page } from "@playwright/test";
import { UserDataType } from "../../data/users";
import { ProductDataType } from "../../data/products";

export class SummaryPage {
  readonly page: Page;
  readonly checkoutSummary: Locator;
  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;
  readonly totalInfoLabel: Locator;
  readonly subtotalInfo: Locator;
  readonly taxInfo: Locator;
  readonly totalInfoValue: Locator;

  readonly finnishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutSummary = this.page.getByTestId("checkout-summary-container");
    this.paymentInfoLabel =
      this.checkoutSummary.getByTestId("payment-info-label");
    this.paymentInfoValue =
      this.checkoutSummary.getByTestId("payment-info-value");
    this.shippingInfoLabel = this.checkoutSummary.getByTestId(
      "shipping-info-label"
    );
    this.shippingInfoValue = this.checkoutSummary.getByTestId(
      "shipping-info-value"
    );
    this.totalInfoLabel = this.checkoutSummary.getByTestId("total-info-label");

    this.subtotalInfo = this.checkoutSummary.getByTestId("subtotal-label");

    this.taxInfo = this.checkoutSummary.getByTestId("tax-label");

    this.totalInfoValue = this.checkoutSummary.getByTestId("total-label");
    this.finnishButton = this.checkoutSummary.getByTestId("finish");
  }

  async assertPaymentInformation() {
    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.paymentInfoLabel).toHaveText("Payment Information:");
    await expect(this.paymentInfoValue).toBeVisible();
    await expect(this.paymentInfoValue).toHaveText("SauceCard #31337");
  }

  async assertShippingInformation() {
    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.shippingInfoLabel).toHaveText("Shipping Information:");
    await expect(this.shippingInfoValue).toBeVisible();
    await expect(this.shippingInfoValue).toHaveText(
      "Free Pony Express Delivery!"
    );
  }

  async assertPriceTotal(products: ProductDataType[]) {
    const totalPrice = products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    const taxPrice = (totalPrice * 0.08).toFixed(2);
    await expect(this.totalInfoLabel).toBeVisible();
    await expect(this.totalInfoLabel).toHaveText("Price Total");
    await expect(this.subtotalInfo).toBeVisible();
    await expect(this.subtotalInfo).toHaveText(`Item total: $${totalPrice}`);
    await expect(this.taxInfo).toBeVisible();
    await expect(this.taxInfo).toHaveText(`Tax: $${taxPrice}`);
    await expect(this.totalInfoValue).toBeVisible();
    await expect(this.totalInfoValue).toHaveText(
      `Total: $${totalPrice + Number(taxPrice)}`
    );
  }

  async assertFinishButtonIsVisible() {
    await expect(this.finnishButton).toBeVisible();
  }

  async clickFinnishButton() {
    await this.finnishButton.click();
  }
}
