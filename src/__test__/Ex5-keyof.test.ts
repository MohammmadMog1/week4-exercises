import { getUserProperty } from "../Exercise/Ex5-keyof";
import type { User } from "../Exercise/Ex2-domain_types";

describe("getUserProperty", () => {
  const user: User = {
    id: 1,
    name: "Mohammad",
    email: "mohammad@gmail.com",
    role: "admin",
    password:"12344"
  };

  test("should return the user's name and his role", () => {
    expect(getUserProperty(user, "name")).toBe("Mohammad");
    expect(getUserProperty(user, "role")).toBe("admin");
  });

  test("should return the correct value types", () => {
    const userId = getUserProperty(user, "id");
    const userName = getUserProperty(user, "name");
    const userRole = getUserProperty(user, "role");

    expect(typeof userId).toBe("number");
    expect(typeof userName).toBe("string");
    expect(typeof userRole).toBe("string");
  });

  //   getUserProperty(user, "age");
});
