export function getApiErrorMessage(error) {
  if (error.response) {
    return (
      error.response.data?.error?.message ||
      error.response.data?.message ||
      "The request could not be completed."
    );
  }

  if (error.request) {
    return "Cannot connect to the server. Please try again.";
  }

  return error.message || "Something went wrong.";
}