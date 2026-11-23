export type Product = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

export type InventoryOperation =
  | "added"
  | "deleted"
  | "updated"
  | "findBySku";

export type InventoryResponse = {
  success: boolean;
  operation: InventoryOperation;
  message: string;
  item: unknown;
};