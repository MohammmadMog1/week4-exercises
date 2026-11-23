import type { Product } from "./inventory.types";

export function createProductIndex(products: Product[]): Map<string, Product> {
  return new Map(products.map((product) => [product.sku, product]));
}
