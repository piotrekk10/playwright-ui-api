export interface ProductDataType {
  name: string;
  price: number;
  description: string;
}

export const SAUCE_LABS_BACKPACK: ProductDataType = {
  name: "Sauce Labs Backpack",
  price: 29.99,
  description:
    "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
};

export const RED_T_SHIRT: ProductDataType = {
  name: "Test.allTheThings() T-Shirt (Red)",
  price: 15.99,
  description:
    "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
};
