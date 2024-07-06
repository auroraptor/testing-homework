// mockData.ts
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    color: string;
    material: string;
}

interface ProductShortInfo {
    id: number;
    name: string;
    price: number;
}

import { Faker, en } from '@faker-js/faker';

const faker = new Faker({
    locale: [en],
});

const commerce = faker.commerce;
const cats = faker.animal;

const generateMockProducts = (count: number = 3): Product[] => {
    const products: Product[] = [];

    for (let id = 0; id < count; id++) {
        products.push({
            id,
            name: `${commerce.productAdjective()} kogtetochka`,
            description: `Really ${commerce.productAdjective()} kogtetochka for ${cats.cat()}`,
            price: Number(commerce.price()),
            color: faker.color.human(),
            material: commerce.productMaterial(),
        });
    }

    return products;
};

export const mockCart = {
    1: { id: 1, name: commerce.productAdjective(), price: Number(commerce.price()), count: 2 },
    2: { id: 2, name: commerce.productAdjective(), price: Number(commerce.price()), count: 1 }
};

export const emptyCart = {};

export const mockProducts = generateMockProducts();
export type { Product, ProductShortInfo };
