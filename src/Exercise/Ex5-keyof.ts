import type { User } from "./Ex2-domain_types";

export function getUserProperty(user: User, key: keyof User) {
  return user[key];
}

const user: User = {
  id: 1,
  name: "Mohammad",
  email: "mohammad@gmail.com",
  role: "admin",
  password: "123456",
};

console.log(getUserProperty(user, "name"));
console.log(getUserProperty(user, "email"));
console.log(getUserProperty(user, "role"));
