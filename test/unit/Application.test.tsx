import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { Application } from "../../src/client/Application";

const mockStore = configureStore({
  reducer: (state = { cart: {} }) => state,
})

describe("Навигация в шапке странице", () => {
  it("отображает навигационные ссылки", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      </Provider>
    );

    const links = screen.getAllByText(/Kogtetochka store/i);
    expect(links[0]).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });

  it("ссылка на главную страницу работает", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      </Provider>
    );

    const homeLink = screen.getAllByText(/Kogtetochka store/i)[0];
    fireEvent.click(homeLink);
    expect(global.window.location.pathname).toEqual("/");
  });

  it("Гамбургер-меню открывается и закрывается", () => {
    window.innerWidth = 500; // Устанавливаем ширину экрана меньше 575 пикселей
    window.dispatchEvent(new Event("resize"));

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      </Provider>
    );

    const hamburgerButton = screen.getByLabelText(/toggle navigation/i);
    const navbarMenu = screen
      .getByRole("navigation")
      .querySelector(".navbar-collapse");

    fireEvent.click(hamburgerButton);
    expect(navbarMenu).not.toHaveClass("collapse");

    fireEvent.click(hamburgerButton);
    expect(navbarMenu).toHaveClass("collapse");

    // Возвращаем размер экрана к исходному состоянию
    window.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));
  });
});
