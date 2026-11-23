import { divide } from "../Exercise/Ex4-discriminated_union";

describe("divide (Discriminated Union)", () => {
  test("returns success with data when dividing by a non-zero number", () => {
    const result = divide(10, 2);

    expect(result.status).toBe("success");

    if (result.status === "success") {
      expect(result.data).toBe("Result is 5");
    }
  });

  test("returns failure with error when dividing by zero", () => {
    const result = divide(10, 0);

    expect(result.status).toBe("failure");

    if (result.status === "failure") {
      expect(result.error).toBe("Cannot divide by zero");
    }
  });
});