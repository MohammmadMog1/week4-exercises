type Role = "student" | "admin" | "super admin";

enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt?: Date;
};
export type Product = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  createdAt?: Date;
};

type OrderItem = {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
};

type Order = {
  id: number;
  user: User;
  products: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
};

//data
export const users: User[] = [
  {
    id: 1,
    name: "mohammad",
    email: "mohammad@gmail.com",
    role: "admin",
    password: "123456",
  },
  {
    id: 2,
    name: "moh",
    email: "moh@gmail.com",
    role: "student",
    password: "123456",
  },
];

export const products: Product[] = [
  {
    id: 101,
    productName: "Keyboard",
    price: 50,
    quantity: 20,
  },
  {
    id: 102,
    productName: "Mouse",
    price: 25,
    quantity: 30,
  },
];

const order: Order = {
  id: 1001,
  user: users[0]!,
  products: [
    {
      product: products[0]!,
      quantity: 2,
      priceAtPurchase: 50,
    },
    {
      product: products[1]!,
      quantity: 3,
      priceAtPurchase: 25,
    },
  ],
  status: OrderStatus.Processing,
  createdAt: new Date(),
};
// console.log(order);
