import { CheckoutFormData } from "src/common/types";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Action, ApplicationState, initStore } from "../../src/client/store";

// Создаем экземпляры API и инициализируем store
const basename = "http://localhost:3000/hw/store";
const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);

// Мокаем setState
jest.mock("../../src/client/api", () => {
  const originalModule = jest.requireActual("../../src/client/api");
  return {
    ...originalModule,
    CartApi: jest.fn().mockImplementation(() => {
      return {
        setState: jest.fn(),
        getState: jest.fn().mockReturnValue({}),
      };
    }),
  };
});

describe("Тестирование createRootReducer", () => {
  beforeEach(() => {
    (cart.setState as jest.Mock).mockClear();
  });

  it("обрабатывает PRODUCTS_LOAD", async () => {
    const action: Action = { type: "PRODUCTS_LOAD" };
    store.dispatch(action);

    const state = store.getState();
    expect(state.products).toBeUndefined();
  });

  it("обрабатывает PRODUCTS_LOADED", async () => {
    const { data: products } = await api.getProducts();
    const action: Action = { type: "PRODUCTS_LOADED", products };
    store.dispatch(action);

    const state: ApplicationState = store.getState();
    expect(state.products).toEqual(products);
  });

  it("обрабатывает PRODUCT_DETAILS_LOADED", async () => {
    const { data: product } = await api.getProductById(17); // сервер отдает id 0-26
    const action: Action = { type: "PRODUCT_DETAILS_LOADED", details: product };
    store.dispatch(action);

    const state: ApplicationState = store.getState();
    expect(state.details[product.id]).toEqual(product);
  });

  it("обрабатывает ADD_TO_CART", async () => {
    const { data: product } = await api.getProductById(13);
    const action: Action = { type: "ADD_TO_CART", product };
    store.dispatch(action);

    const state: ApplicationState = store.getState();
    expect(state.cart[product.id]).toEqual({
      name: product.name,
      count: 1,
      price: product.price,
    });
    expect(state.latestOrderId).toBeUndefined();
    expect(cart.setState).toHaveBeenCalled();
  });

  it("обрабатывает CLEAR_CART", async () => {
    const { data: product } = await api.getProductById(1); // Предполагаем, что продукт с id=1 существует
    store.dispatch({ type: "ADD_TO_CART", product });

    const action: Action = { type: "CLEAR_CART" };
    store.dispatch(action);

    const state: ApplicationState = store.getState();
    expect(state.cart).toEqual({});
    expect(cart.setState).toHaveBeenCalled();
    expect(state.latestOrderId).toBeUndefined();
  });

  it("обрабатывает CHECKOUT_COMPLETE", async () => {
    const { data: product } = await api.getProductById(7);
    store.dispatch({ type: "ADD_TO_CART", product });

    const orderId = 1712; // Это значение должно быть получено от сервера после выполнения checkout
    const action: Action = { type: "CHECKOUT_COMPLETE", orderId };
    store.dispatch(action);

    const state: ApplicationState = store.getState();
    expect(state.latestOrderId).toEqual(orderId);
    expect(cart.setState).toHaveBeenCalled();
    expect(state.cart).toEqual({});
  });
});
