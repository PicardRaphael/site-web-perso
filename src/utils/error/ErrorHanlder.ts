import { z } from 'zod';

interface ErrorResponse {
  success: false;
  error: string | z.ZodError['errors'];
}

interface SuccessResponse<T> {
  success: true;
  data: T;
}

type Response<T> = ErrorResponse | SuccessResponse<T>;

class ErrorHandler {
  static handleZodError(error: z.ZodError): ErrorResponse {
    return { success: false, error: error.errors };
  }

  static handleUnexpectedError(message: string): ErrorResponse {
    return { success: false, error: message };
  }

  static handleApiError(error: unknown): ErrorResponse {
    if (error instanceof z.ZodError) {
      return this.handleZodError(error);
    }

    if (typeof error === 'string') {
      return this.handleUnexpectedError(error);
    }

    return this.handleUnexpectedError('An unexpected error occurred');
  }

  static handleSuccess<T>(data: T): SuccessResponse<T> {
    return { success: true, data };
  }
}

export { ErrorHandler };
export type { Response, ErrorResponse, SuccessResponse };
