// CatalogPage.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Catalog } from '../../src/client/pages/Catalog';
import { ApplicationState } from '../../src/client/store';
import { mockProducts, ProductShortInfo } from './mockData'; // Используем mock данные и тип

jest.mock('../../src/client/components/ProductItem', () => ({
    ProductItem: ({ product }: { product: ProductShortInfo }) => (
        <div data-testid={product.id} className="ProductItem card w-100 mb-4">
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
            </div>
        </div>
    ),
}));

const initialState: ApplicationState = {
    products: null,
    cart: {},
    details: undefined,
};

const storeWithProducts = configureStore({
    reducer: (state = { ...initialState, products: mockProducts }) => state,
});

const storeWithoutProducts = configureStore({
    reducer: (state = { ...initialState, products: null }) => state,
});

describe('Страница каталога', () => {
    it('отображает заголовок страницы каталога', () => {
        render(
            <Provider store={storeWithProducts}>
                <MemoryRouter initialEntries={['/catalog']}>
                    <Routes>
                        <Route path="/catalog" element={<Catalog />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByRole('heading', { name: /Catalog/i })).toBeInTheDocument();
    });

    it('отображает состояние загрузки', () => {
        render(
            <Provider store={storeWithoutProducts}>
                <MemoryRouter initialEntries={['/catalog']}>
                    <Routes>
                        <Route path="/catalog" element={<Catalog />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/LOADING/i)).toBeInTheDocument();
    });

    it.skip('отображает продукты, когда они загружены', () => {
        render(
            <Provider store={storeWithProducts}>
                <MemoryRouter initialEntries={['/catalog']}>
                    <Routes>
                        <Route path="/catalog" element={<Catalog />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        mockProducts.forEach(product => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
            expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        });
    });
});
