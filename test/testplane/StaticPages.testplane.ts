describe("Статические страницы", () => {
  it("отображает главную страницу для десктопа", async ({ browser }) => {
    await browser.url("/hw/store/");
    await browser.setWindowSize(1024, 768);
    const app = await browser.$(".Application");
    await app.assertView("main");
    await browser.setWindowSize(375, 667);
    await app.assertView("main_mobile");
  });
  it("отображает страницу условий доставки", async ({ browser }) => {
    await browser.url("/hw/store/delivery");
    await browser.setWindowSize(1024, 768);
    const app = await browser.$(".Delivery");
    await app.assertView("delivery");
    await browser.setWindowSize(375, 667);
    await app.assertView("delivery_mobile");
  });
  it("отображает страницу контактов", async ({ browser }) => {
    await browser.url("/hw/store/contacts");
    await browser.setWindowSize(1024, 768);
    const app = await browser.$(".Contacts");
    await app.assertView("contacts");
    await browser.setWindowSize(375, 667);
    await app.assertView("contacts_mobile");
  });
});
