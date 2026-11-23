import type { Product } from "./inventory.types";

export function isValidProduct(product: unknown): product is Product {
  if (typeof product !== "object" || product === null) {
    return false;
  }

  const candidate = product as Record<string, unknown>;

  const isValidSku =
    typeof candidate.sku === "string" &&
    candidate.sku.trim().length > 0;

  const isValidName =
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0;

  const isValidPrice =
    typeof candidate.price === "number" &&
    candidate.price >= 0;

  const isValidQuantity =
    typeof candidate.quantity === "number" &&
    Number.isInteger(candidate.quantity) &&
    candidate.quantity > 0;

  return (
    isValidSku &&
    isValidName &&
    isValidPrice &&
    isValidQuantity
  );
}