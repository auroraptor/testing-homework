import { getUrl } from "../utils/getUrl";


describe("Страница корзины", () => {
    it("отображает ссылку на каталог, когда корзина пуста", async ({
		browser,
	}) => {
		await browser.url("/hw/store/cart");
		const cart = await browser.$(".Cart");
        const linkToCatalog = await cart.$$("a")

		expect(linkToCatalog).toExist();
	});

	it("отображает корзину с продуктами", async ({
		browser,
	}) => {
		await browser.url(getUrl("/catalog/0"));
		const addToCartBtn = await browser.$(".ProductDetails-AddToCart");

		await addToCartBtn.click();
		await browser.url("/hw/store/cart");
		const cartTable = await browser.$(".Cart-Table");
		await cartTable.waitForExist();

		expect(cartTable).toExist();
	});
});