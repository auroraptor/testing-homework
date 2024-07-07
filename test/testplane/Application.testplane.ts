import { getUrl } from "../utils/getUrl";

describe("Навигация в шапке странице", () => {
  it("в виде гамбургера на мобильных", async ({ browser }) => {
    await browser.url(getUrl("/"));
    await browser.setWindowSize(575, 575);

    const toggler = await browser.$(".Application-Toggler.navbar-toggler");
    const menu = await browser.$(".Application-Menu.collapse");
    const isTogglerDisplayed = await toggler.getCSSProperty("display");
    const isMenuDisplayed = await menu.getCSSProperty("display");

    expect(isTogglerDisplayed.value).toEqual("block");
    expect(isMenuDisplayed.value).toEqual("none");
  });

  it("гамбургер-меню открывается", async ({ browser }) => {
    await browser.url(getUrl("/"));
    await browser.setWindowSize(575, 575);

    const toggler = await browser.$(".Application-Toggler.navbar-toggler");
    await toggler.click();
    const menu = await browser.$(".Application-Menu");

    const isMenuDisplayed = await menu.getCSSProperty("display");

    expect(isMenuDisplayed.value).toEqual("block");
  });

  it("гамбургер-меню закрывается", async ({ browser }) => {
    await browser.url(getUrl("/delivery"));
    await browser.setWindowSize(575, 575);

    const toggler = await browser.$(".Application-Toggler.navbar-toggler");
    await toggler.click();
    const contactsLink = await browser.$('[href="/hw/store/contacts"]');
    await contactsLink.click();

    const menu = await browser.$(".Application-Menu.navbar-collapse");
    const isMenuDisplayed = await menu.getCSSProperty("display");

    expect(isMenuDisplayed.value).toEqual("none");
  });
});
