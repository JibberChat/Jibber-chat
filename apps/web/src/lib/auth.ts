interface SignError {
  errors: { message: string }[];
}

export function isSignError(error: unknown): error is SignError {
  return typeof error === "object" && error !== null && "errors" in error && Array.isArray((error as SignError).errors);
}
