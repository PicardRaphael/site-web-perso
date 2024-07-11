import { z } from 'zod';
import { ErrorHandler, ErrorResponse, SuccessResponse } from './ErrorHanlder';

describe('ErrorHandler', () => {
  it('should handle Zod errors correctly', () => {
    const zodError = new z.ZodError([
      {
        path: ['field'],
        message: 'Invalid',
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
      },
    ]);
    const errorResponse: ErrorResponse = ErrorHandler.handleZodError(zodError);

    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toEqual(zodError.errors);
  });

  it('should handle unexpected errors correctly', () => {
    const message = 'Unexpected error occurred';
    const errorResponse: ErrorResponse =
      ErrorHandler.handleUnexpectedError(message);

    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toBe(message);
  });

  it('should handle API errors correctly for ZodError', () => {
    const zodError = new z.ZodError([
      {
        path: ['field'],
        message: 'Invalid',
        code: 'invalid_type',
        expected: 'string',
        received: 'number',
      },
    ]);
    const errorResponse: ErrorResponse = ErrorHandler.handleApiError(zodError);

    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toEqual(zodError.errors);
  });

  it('should handle API errors correctly for string error', () => {
    const message = 'API call failed';
    const errorResponse: ErrorResponse = ErrorHandler.handleApiError(message);

    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toBe(message);
  });

  it('should handle API errors correctly for unknown error', () => {
    const error = { message: 'Unknown error' };
    const errorResponse: ErrorResponse = ErrorHandler.handleApiError(error);

    expect(errorResponse.success).toBe(false);
    expect(errorResponse.error).toBe('An unexpected error occurred');
  });

  it('should handle success responses correctly', () => {
    const data = { id: 1, name: 'Test' };
    const successResponse: SuccessResponse<typeof data> =
      ErrorHandler.handleSuccess(data);

    expect(successResponse.success).toBe(true);
    expect(successResponse.data).toEqual(data);
  });
});
