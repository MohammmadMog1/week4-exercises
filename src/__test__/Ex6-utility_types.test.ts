// import {
//   getPublicUser,
//   createProduct,
//   updateUser,
// } from "../Exercise/Ex6-utility_types.ts";

import * as utilities from "../Exercise/Ex6-utility_types";

import type { User, Product } from "../Exercise/Ex2-domain_types";

describe("Utility Types", () => {
  const user: User = {
    id: 1,
    name: "Mohammad",
    email: "mohammad@gmail.com",
    role: "student",
    password: "12355",
  };

  describe("Pick - getPublicUser", () => {
    test("should return only name and email", () => {
      const result = utilities.getPublicUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      });

      expect(result).toEqual({
        name: "Mohammad",
        email: "mohammad@gmail.com",
      });

      expect(result).not.toHaveProperty("id");
      expect(result).not.toHaveProperty("role");
    });
  });

  describe("Omit - createProduct", () => {
    test("should create a product with generated id and createAt", () => {
      const result = utilities.createProduct({
        productName: "Keyboard",
        price: 50,
        quantity: 20,
      });

      expect(result).toMatchObject({
        productName: "Keyboard",
        price: 50,
        quantity: 20,
      });

      expect(typeof result.id).toBe("number");
    });
  });

  describe("Partial - updateUser", () => {
    test("should update only the provided user fields", () => {
      const result = utilities.updateUser(1, { name: "hassan" });

      expect(result[0]!.name).toBe("hassan");
      expect(result[0]!.email).toBe(user.email);
    });
  });
});
