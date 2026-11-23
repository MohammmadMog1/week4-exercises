import type { Product, User } from "./Ex2-domain_types";
import { users } from "./Ex2-domain_types";

//Pick
type CreateUserInput = Pick<User, "name" | "email">;

export function getPublicUser(user: User): CreateUserInput {
  return {
    name: user.name,
    email: user.email,
  };
}

//Pick
type CreateProductInput = Omit<Product, "id" | "createdAt">;

export function createProduct(newProduct: CreateProductInput): Product {
  return {
    id: Math.random(),
    ...newProduct,
    createdAt: new Date(),
  };
}

// Partial
export function updateUser(id: number, fieldsToUpdate: Partial<User>) {
  return users.map((user) =>
    user.id === id ? { ...user, ...fieldsToUpdate } : user,
  );
}

// Record
// ProductStock
type ProductStock = Record<string, number>;

const productStock: ProductStock = {
  Keyboard: 20,
  Mouse: 30,
  Monitor: 10,
};

const invalidStock: ProductStock = {
  Keyboard: 20,
  //   Mouse: "thirty",
};

// Partial - updateUser
console.log(updateUser(1, { name: "moh1" }));
console.log(updateUser(1, { email: "Ahmad@gamil.com", name: "new" }));

// Pick - getPublicUser
console.log(
  getPublicUser({
    id: 1,
    name: "mmm",
    email: "mohammad@gmail.com",
    role: "admin",
    password: "111111",
  }),
);


