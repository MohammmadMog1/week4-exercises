export interface IProductInput {
  id: string;
  name: string;
  price: number;
}

export function isProductInput(value: unknown): value is IProductInput {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    typeof record.price === "number"
  );
}

export function parseProduct(input: string): string {
  const raw: unknown = JSON.parse(input);

  if (!isProductInput(raw)) {
    return "Invalid product JSON";
  }
  return `${raw.name} (${raw.id}) - $${raw.price}`;
}