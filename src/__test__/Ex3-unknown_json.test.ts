// product-parser.test.ts
import {
  IProductInput,
  isProductInput,
  parseProduct,
} from "../Exercise/Ex3-unknown_JSON";

describe("Exercise 3 - Unknown JSON & Type Guard", () => {
  describe("isProductInput", () => {
    test("returns true for a valid ProductInput object", () => {
      const candidate: IProductInput = {
        id: "p-100",
        name: "Wireless Mouse",
        price: 25,
      };
      expect(isProductInput(candidate)).toBe(true);

      if (isProductInput(candidate)) {
        const typedProduct: IProductInput = candidate;
        expect(typedProduct.id).toBe("p-100");
        expect(typedProduct.name).toBe("Wireless Mouse");
        expect(typedProduct.price).toBe(25);
      }
    });

    test("returns false for null and primitive values", () => {
      expect(isProductInput(null)).toBe(false);
      expect(isProductInput(undefined)).toBe(false);
      expect(isProductInput("just a string")).toBe(false);
      expect(isProductInput(123)).toBe(false);
      expect(isProductInput(true)).toBe(false);
    });

    test("returns false when required fields are missing or have wrong types", () => {
      expect(isProductInput({ id: "p-100", name: "Mouse", price: "25" })).toBe(
        false,
      );
      expect(isProductInput({ id: "p-100", price: 25 })).toBe(false);
      expect(isProductInput({ id: 100, name: "Mouse", price: 25 })).toBe(false);
      expect(isProductInput([])).toBe(false);
    });
  });

  describe("parseProduct", () => {
    test("formats product details when JSON matches ProductInput", () => {
      const validJson = JSON.stringify({
        id: "p-202",
        name: "Mechanical Keyboard",
        price: 80,
      });

      expect(parseProduct(validJson)).toBe("Mechanical Keyboard (p-202) - $80");
    });

    test("returns 'Invalid product JSON' when JSON shape is invalid", () => {
      const invalidShapeJson = JSON.stringify({
        id: "p-202",
        name: "Mechanical Keyboard",
        price: "not-a-number",
      });

      expect(parseProduct(invalidShapeJson)).toBe("Invalid product JSON");
      expect(parseProduct("null")).toBe("Invalid product JSON");
      expect(parseProduct('"hello"')).toBe("Invalid product JSON");
    });

    test("throws SyntaxError when input is malformed JSON", () => {
      expect(() => parseProduct("{invalid json")).toThrow(SyntaxError);
    });
  });
});
