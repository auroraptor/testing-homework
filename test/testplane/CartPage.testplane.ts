import { getUrl } from "../utils/getUrl";
import { faker } from "../utils/mockData";

describe("Страница корзины", () => {
  it("отображает ссылку на каталог, когда корзина пуста", async ({
    browser,
  }) => {
    await browser.url(getUrl("/cart"));
    const cart = await browser.$(".Cart");
    const linkToCatalog = await cart.$$("a");

    expect(linkToCatalog).toExist();
  });

  it("отображает корзину с продуктами", async ({ browser }) => {
    await browser.url(getUrl("/catalog/0"));
    const addToCartBtn = await browser.$(".ProductDetails-AddToCart");

    await addToCartBtn.click();
    await browser.url(getUrl("/cart"));
    const cartTable = await browser.$(".Cart-Table");
    await cartTable.waitForExist();

    expect(cartTable).toExist();
  });

  it("отображает сообщение об успешном заказе", async ({ browser }) => {
    await browser.url(getUrl("/cart"));
    const orderForm = await browser.$(".Form");

    const inputName = await orderForm.$("input#f-name");
    await inputName.setValue(faker.person.firstName());
    const inputPhone = await orderForm.$("input#f-phone");
    await inputPhone.setValue("12345678900"); // валидация инпута
    const inputAddress = await orderForm.$("textarea#f-address");
    await inputAddress.setValue(faker.location.streetAddress());

    const sendBtn = await orderForm.$(".Form-Submit");
    await sendBtn.click();
    const successMessage = await browser.$(".Cart-SuccessMessage");
    await successMessage.waitForExist();

    expect(successMessage).toExist();
  });

  it("отображает сообщение об ошибке, когда телефон невалидный", async ({
    browser,
  }) => {
    await browser.url(getUrl("/catalog/0"));
    const addToCartBtn = await browser.$(".ProductDetails-AddToCart");
    await addToCartBtn.click();
    await browser.url(getUrl("/cart"));
    const orderForm = await browser.$(".Form");

    const inputName = await orderForm.$("input#f-name");
    await inputName.setValue(faker.person.firstName());
    const inputPhone = await orderForm.$("input#f-phone");
    await inputPhone.setValue(faker.phone.imei()); // валидация инпута
    const inputAddress = await orderForm.$("textarea#f-address");
    await inputAddress.setValue(faker.location.streetAddress());

    const sendBtn = await orderForm.$(".Form-Submit");
    await sendBtn.click();
    const errorMessage = await browser.$(".invalid-feedback");
    await errorMessage.waitForExist();

    expect(errorMessage).toExist();
  });
});
