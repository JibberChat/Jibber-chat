interface GraphqlError {
  errors: { message: string }[];
}

export function isGraphqlError(error: unknown): error is GraphqlError {
  return (
    typeof error === "object" && error !== null && "errors" in error && Array.isArray((error as GraphqlError).errors)
  );
}
