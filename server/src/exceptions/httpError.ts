class HttpError extends Error {
  code: number;
  constructor(
    statusCode: number = 500,
    message: string = "There was an unexpected error"
  ) {
    super(message);
    this.code = statusCode;
    this.message = message;
  }
}

export default HttpError;
