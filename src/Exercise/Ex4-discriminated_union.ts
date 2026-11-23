export type Success = {
  status: "success";
  data: string;
};

export type Failure = {
  status: "failure";
  error: string;
};

export type Result = Success | Failure;

export function divide(a: number, b: number): Result {
  if (b === 0) {
    return { status: "failure", error: "Cannot divide by zero" };
  }

  return { status: "success", data: `Result is ${a / b}` };
}

const res = divide(2, 10);

if (res.status === "success") {
  console.log(res.data);
} else {
  console.log(res.error);
}
