import type { InventoryOperation, InventoryResponse } from "./inventory.types";

export function createResponse(
  status: boolean,
  operation: InventoryOperation,
  message: string,
  item: unknown,
): InventoryResponse {
  return {
    success: status,
    operation,
    message,
    item,
  };
}
