import { faker } from "@faker-js/faker";
import { Product } from "../Products/entities";

// Function to generate fake data for the Product interface
function getThreeDigitsAfterDecimal(num: number): number {
  return Number(num.toFixed(3));
}
export function generateFakeProduct(): Product {
  return {
    name: faker.commerce.productName(),
    unitPrice: parseFloat(faker.commerce.price()),
    quantity: getThreeDigitsAfterDecimal(
      faker.number.float({ min: 1, max: 10 })
    ),
  };
}

// Generate an array of 5 fake products
