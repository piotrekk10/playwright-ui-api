import { expect, Locator, Page } from "@playwright/test";
import { UserDataType } from "../../data/users";

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutInfo: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutInfo = this.page.getByTestId("checkout-info-container");
    this.firstNameInput = this.checkoutInfo.getByTestId("firstName");
    this.lastNameInput = this.checkoutInfo.getByTestId("lastName");
    this.postalCodeInput = this.checkoutInfo.getByTestId("postalCode");
    this.continueButton = this.checkoutInfo.getByTestId("continue");
  }

  async assertCheckoutFormsAreVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async fillCheckoutForms(userData: UserDataType) {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.postalCodeInput.fill(userData.postalCode);
  }

  async assertContinueButtonIsVisible() {
    await expect(this.continueButton).toBeVisible();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}
