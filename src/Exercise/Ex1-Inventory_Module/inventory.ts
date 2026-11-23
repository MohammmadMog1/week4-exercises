import { inventory } from "./inventory.data";
import { isValidProduct } from "./isValidProduct";
import { createProductIndex } from "./createProductIndex";
import { createResponse } from "./messages";

import type { Product } from "./inventory.types";

const inventoryMapObj = createProductIndex(inventory);

// isValidSku()
function isValidSku(sku: unknown): sku is string {
  return typeof sku === "string" && sku.trim().length > 0;
}

// addItem()
export function addItem(newProduct: unknown) {
  if (!isValidProduct(newProduct)) {
    return createResponse(
      false,
      "added",
      "Invalid product data.",
      newProduct,
    );
  }

  if (inventoryMapObj.has(newProduct.sku)) {
    return createResponse(
      false,
      "added",
      "Product already exists.",
      newProduct,
    );
  }

  inventoryMapObj.set(newProduct.sku, newProduct);

  return createResponse(
    true,
    "added",
    "Product added successfully.",
    newProduct,
  );
}

// removeItem()
export function removeItem(sku: unknown) {
  if (!isValidSku(sku)) {
    return createResponse(false, "deleted", "Invalid SKU.", sku);
  }

  const deletedProduct = inventoryMapObj.get(sku);

  if (!deletedProduct) {
    return createResponse(
      false,
      "deleted",
      "Product does not exist.",
      sku,
    );
  }

  inventoryMapObj.delete(sku);

  return createResponse(
    true,
    "deleted",
    "Product deleted successfully.",
    deletedProduct,
  );
}

// updateQuantity()
export function updateQuantity(
  sku: unknown,
  newQuantity: unknown,
) {
  if (!isValidSku(sku)) {
    return createResponse(false, "updated", "Invalid SKU.", sku);
  }

  if (
    typeof newQuantity !== "number" ||
    !Number.isInteger(newQuantity) ||
    newQuantity < 0
  ) {
    return createResponse(
      false,
      "updated",
      "Invalid quantity.",
      newQuantity,
    );
  }

  const existingProduct = inventoryMapObj.get(sku);

  if (!existingProduct) {
    return createResponse(
      false,
      "updated",
      "Product does not exist.",
      sku,
    );
  }

  const updatedProduct: Product = {
    ...existingProduct,
    quantity: newQuantity,
  };

  inventoryMapObj.set(sku, updatedProduct);

  return createResponse(
    true,
    "updated",
    "Quantity updated successfully.",
    updatedProduct,
  );
}

// findBySku()
export function findBySku(sku: unknown) {
  if (!isValidSku(sku)) {
    return createResponse(
      false,
      "findBySku",
      "Invalid SKU.",
      sku,
    );
  }

  const product = inventoryMapObj.get(sku);

  if (!product) {
    return createResponse(
      false,
      "findBySku",
      "Product does not exist.",
      sku,
    );
  }

  return createResponse(
    true,
    "findBySku",
    "Product fetched successfully.",
    product,
  );
}

// lowStock()
export function lowStock(threshold: unknown): Product[] {
  if (
    typeof threshold !== "number" ||
    !Number.isInteger(threshold) ||
    !Number.isFinite(threshold) ||
    threshold < 0
  ) {
    throw new Error(
      "Threshold must be a non-negative integer.",
    );
  }

  return [...inventoryMapObj.values()].filter(
    (product) => product.quantity <= threshold,
  );
}

// inventoryValue()
export function inventoryValue(): number {
  return [...inventoryMapObj.values()].reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
}



// const newProduct = {
//   sku: "P005",
//   name: "Webcam",
//   price: 60,
//   quantity: 2,
// };

// console.log(addItem(newProduct));
// console.log(removeItem("P004"));
// console.log(updateQuantity("P003", 10));
// console.log(findBySku("P002"));
// console.log(lowStock(5));