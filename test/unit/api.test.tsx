import axios from "axios";
import { ExampleApi } from "../../src/client/api";
import { ProductShortInfo } from "./mockData";

describe("Тестирование данных с сервера", () => {
  const basename = "http://localhost:3000/hw/store";
  const api = new ExampleApi(basename);

  it("получает товары напрямую через axios", async () => {
    const response = await axios.get(`${basename}/api/products`);
    const { data } = response;

    data.forEach((product: ProductShortInfo) => {
      expect(product.id).not.toBeUndefined();
      expect(product.name).not.toBeUndefined();
      expect(product.price).not.toBeUndefined();
    });
  });

  it("получает товары через ExampleApi", async () => {
    const { data } = await api.getProducts();

    data.forEach((product) => {
      expect(product.id).not.toBeUndefined();
      expect(product.name).not.toBeUndefined();
      expect(product.price).not.toBeUndefined();
    });
  });

  it("получает товар по id", async () => {
    const productId = 1;
    const { data: product } = await api.getProductById(productId);

    expect(product.id).toBe(productId);
    expect(product.name).not.toBeUndefined();
    expect(product.price).not.toBeUndefined();
  });

  const formData = {
    name: "Test User",
    phone: "1234567890",
    address: "123 Test Street",
  };

  const cartData = {
    items: [
      { productId: 1, count: 2 },
      { productId: 2, count: 1 },
    ],
  };

  it("создает заказ c id", async () => {
    const response = await api.checkout(formData, cartData);
    const { data } = response;

    expect(data.id).not.toBeUndefined();
    expect(typeof data.id).toBe("number");
  });

  it("создает заказы c последовательными id", async () => {
    const { data: firstData } = await api.checkout(formData, cartData);
    const { data: secondData } = await api.checkout(formData, cartData);

    const diff = secondData.id - firstData.id;

    expect(diff).toBe(1);
  });
});
