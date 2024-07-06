// StaticPages.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Home } from '../../src/client/pages/Home';
import { Delivery } from '../../src/client/pages/Delivery';
import { Contacts } from '../../src/client/pages/Contacts';

const mockStore = configureStore({
  reducer: (state = {}) => state,
});

describe('Статические страницы', () => {
  it('отображает главную страницу', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Welcome to Kogtetochka store!/i)).toBeInTheDocument();
    expect(screen.getByText(/We have a large assortment of scratching posts!/i)).toBeInTheDocument();
  });

  it('отображает страницу условий доставки', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/delivery']}>
          <Routes>
            <Route path="/delivery" element={<Delivery />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Delivery/i })).toBeInTheDocument();
    expect(screen.getByText(/Swift and Secure Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Track Your Package with Ease/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Satisfaction Guaranteed/i)).toBeInTheDocument();
  });

  it('отображает страницу контактов', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/contacts']}>
          <Routes>
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Contacts/i })).toBeInTheDocument();
    expect(screen.getByText(/Have a question about our scratchers or need help placing an order?/i)).toBeInTheDocument();
    expect(screen.getByText(/Our friendly representatives are available during business hours to assist you with any inquiries you may have./i)).toBeInTheDocument();
    expect(screen.getByText(/At our store, customer satisfaction is our priority/i)).toBeInTheDocument();
  });
});
