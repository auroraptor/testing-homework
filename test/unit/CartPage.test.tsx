// CartPage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Cart } from '../../src/client/pages/Cart';
import { mockProducts, mockCart, emptyCart } from './mockData';
import { ApplicationState, createRootReducer } from '../../src/client/store';

const initialState: ApplicationState = {
    products: mockProducts,
    details: {},
    cart: mockCart,
    latestOrderId: null,
};

const emptyState: ApplicationState = {
    products: mockProducts,
    details: {},
    cart: emptyCart,
    latestOrderId: null,
};

const storeWithProducts = configureStore({
    reducer: createRootReducer({}),
    preloadedState: initialState,
});

const storeWithoutProducts = configureStore({
    reducer: createRootReducer({}),
    preloadedState: emptyState,
});

describe('Страница корзины', () => {
    it('отображает корзину с продуктами', () => {
        render(
            <Provider store={storeWithProducts}>
                <MemoryRouter initialEntries={['/cart']}>
                    <Routes>
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Проверяем, что заголовок отображается
        expect(screen.getByRole('heading', { name: /Shopping cart/i })).toBeInTheDocument();

        // Проверяем наличие кнопки очистки корзины
        expect(screen.getByText(/Clear shopping cart/i)).toBeInTheDocument();

        // Проверяем наличие формы оформления заказа
        expect(screen.getByText(/Сheckout/i)).toBeInTheDocument();
    });

    it('отображает сообщение о пустой корзине', () => {
        render(
            <Provider store={storeWithoutProducts}>
                <MemoryRouter initialEntries={['/cart']}>
                    <Routes>
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Проверяем, что заголовок отображается
        expect(screen.getByRole('heading', { name: /Shopping cart/i })).toBeInTheDocument();

        // Проверяем, что отображается сообщение о пустой корзине
        expect(screen.getByText(/Cart is empty. Please select products in the /i)).toBeInTheDocument();

        // Проверяем, что кнопка очистки корзины не отображается
        expect(screen.queryByText(/Clear shopping cart/i)).not.toBeInTheDocument();

        // Проверяем, что форма оформления заказа не отображается
        expect(screen.queryByText(/Сheckout/i)).not.toBeInTheDocument();
    });
});
