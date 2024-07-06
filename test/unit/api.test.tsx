import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "src/client/store";

describe("Тестирование данных с сервера", () => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);
  const cart = new CartApi();
//   const store = initStore(api, cart);

  console.log("api", api);


  it("получает товары", async () => {
    const { data } = await api.getProducts();

    data.forEach((product) => {
      expect(product.id).not.toBeUndefined();
      expect(product.name).not.toBeUndefined();
      expect(product.price).not.toBeUndefined();
    });
  });
});
