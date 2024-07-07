import { getUrl } from "../utils/getUrl";

describe("Динамические страницы", () => {
    it("отображает страницу каталога", async ({ browser }) => {
      await browser.url(getUrl("/catalog"));
      await browser.setWindowSize(1024, 768);
      const app = await browser.$(".Catalog");
      await app.assertView("catalog", {
        ignoreElements: [".ProductItem-Name", ".ProductItem-Price"],
      });
      await browser.setWindowSize(375, 667);
      await app.assertView("catalog_mobile");
    });
    it("отображает страницу каталога", async ({ browser }) => {
        await browser.url(getUrl("/catalog/0"));
        await browser.setWindowSize(1024, 768);
        const app = await browser.$(".Product");
        await app.assertView("product", {
            ignoreElements: [".ProductDetails-Name", ".ProductDetails-Description", ".ProductDetails-Price", ".ProductDetails-Color", ".ProductDetails-Material"],
          });
        await browser.setWindowSize(375, 667);
        await app.assertView("product_mobile");
      });
  });
  