export default class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors: unknown = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnautharizedError() {
    return new ApiError(401, 'User not authorized');
  }

  static BadRequest(message: string, errors: unknown = []) {
    return new ApiError(400, message, errors);
  }

  static ForbiddenRequest(message: string, errors: unknown = []) {
    return new ApiError(403, message, errors);
  }

  static InternalServerError(message: string, errors: unknown = []) {
    return new ApiError(403, message, errors);
  }
}