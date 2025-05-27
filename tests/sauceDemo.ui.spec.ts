import { RED_T_SHIRT, SAUCE_LABS_BACKPACK } from "@data/products";
import { STANDARD_USER } from "@data/users";
import {
  CartPage,
  CheckoutCompletePage,
  CheckoutPage,
  InventoryPage,
  SummaryPage,
} from "@pages";
import { Header, Product } from "@panels";
import { test as _test } from "@playwright/test";

interface TestProps {
  cartItem: Product;
  cartPage: CartPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutPage: CheckoutPage;
  summaryPage: SummaryPage;
  header: Header;
  inventoryPage: InventoryPage;
  inventoryItem: Product;
}

const test = _test.extend<TestProps>({
  cartItem: async ({ page }, use) => {
    await use(new Product(page, "cart"));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  summaryPage: async ({ page }, use) => {
    await use(new SummaryPage(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  inventoryItem: async ({ page }, use) => {
    await use(new Product(page, "inventory"));
  },
});

test.describe("Authenticated user", () => {
  test.use({ storageState: STANDARD_USER.file });
  test("should be able to make an order", async ({
    cartItem,
    cartPage,
    checkoutCompletePage,
    checkoutPage,
    header,
    inventoryItem,
    inventoryPage,
    summaryPage,
  }) => {
    await inventoryPage.goto();
    const products = [SAUCE_LABS_BACKPACK];
    for (const product of products) {
      await inventoryItem.assertProduct({ item: product });
      await inventoryItem.clickItemButton({ item: product, buttonType: "add" });
    }
    await header.assertShoppingCart(products.length);
    await header.clickShoppingCart();
    for (const product of products) {
      await cartItem.assertProduct({
        item: product,
        buttonType: "remove",
      });
    }
    await cartPage.assertCheckoutButtonIsVisible();
    await cartPage.clickCheckoutButton();
    await checkoutPage.assertCheckoutFormsAreVisible();
    await checkoutPage.fillCheckoutForms(STANDARD_USER);
    await checkoutPage.assertContinueButtonIsVisible();
    await checkoutPage.clickContinueButton();
    await summaryPage.assertPaymentInformation();
    await summaryPage.assertShippingInformation();
    await summaryPage.assertPriceTotal(products);
    await summaryPage.assertFinishButtonIsVisible();
    await summaryPage.clickFinnishButton();
    await checkoutCompletePage.assertCheckoutComplete();
  });

  test("should be able to remove product from the cart", async ({
    cartItem,
    header,
    inventoryItem,
    inventoryPage,
  }) => {
    await inventoryPage.goto();
    await inventoryItem.clickItemButton({
      item: RED_T_SHIRT,
      buttonType: "add",
    });
    await header.assertShoppingCart(1);
    await header.clickShoppingCart();
    await cartItem.assertProduct({
      item: RED_T_SHIRT,
      buttonType: "remove",
    });
    await cartItem.clickItemButton({
      item: RED_T_SHIRT,
      buttonType: "remove",
    });
    await cartItem.inventoryItemIsNotVisible();
    await header.assertShoppingCart(0);
  });
});
