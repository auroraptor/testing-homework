export function getPageUrl(route: string) {
	const bug_id = process.env.BUG_ID;

	return `http://localhost:3000/hw/store/${route}${
		bug_id ? `?bug_id=${bug_id}` : ""
	}`;
}

describe("Навигация в шапке странице", () => {
	it('в виде гамбургера на мобильных', async ({
		browser
	}) => {
		await browser.url(getPageUrl(""));
		await browser.setWindowSize(575, 713);

		const toggler = await browser.$(".Application-Toggler.navbar-toggler");
		const menu = await browser.$(".Application-Menu.collapse");
		const isTogglerDisplayed = await toggler.getCSSProperty("display");
		const isMenuDisplayed = await menu.getCSSProperty("display");

		expect(isTogglerDisplayed.value).toEqual("block");
		expect(isMenuDisplayed.value).toEqual("none");
	});

	it('гамбургер-меню открывается', async ({ browser }) => {
		await browser.url(getPageUrl("/"));
		await browser.setWindowSize(575, 713);

		const toggler = await browser.$(".Application-Toggler.navbar-toggler");
		await toggler.click();
		const menu = await browser.$(".Application-Menu");

		const isMenuDisplayed = await menu.getCSSProperty("display");

		expect(isMenuDisplayed.value).toEqual("block");
	});

	it('гамбургер-меню закрывается', async ({
		browser,
	}) => {
		await browser.url(getPageUrl("delivery"));
		await browser.setWindowSize(575, 713);

		const toggler = await browser.$(".Application-Toggler.navbar-toggler");
		await toggler.click();
		const contactsLink = await browser.$('[href="/hw/store/contacts"]');
		await contactsLink.click();

		const menu = await browser.$(".Application-Menu.navbar-collapse");
		const isMenuDisplayed = await menu.getCSSProperty("display");

		expect(isMenuDisplayed.value).toEqual("none");
	});
});