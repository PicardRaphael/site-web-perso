import { NextResponse } from 'next/server';
import { userRoleSchema } from '@src/domain/schemas/userSchema';
import { setUserRoleAction } from '@app/_actions/setUserRoleAction';
import { ErrorHandler } from '@src/utils/error/ErrorHanlder';
import { z } from 'zod';

/**
 * Handles the POST request to set the user role.
 * @param {Request} request - The incoming HTTP request.
 * @returns {Promise<NextResponse>} - The HTTP response.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse the JSON body from the request
    const { role } = await request.json();
    try {
      // Validate the role using Zod schema
      const validatedData = userRoleSchema.parse(role);
      // Perform the setUserRoleAction with the validated data
      const result = await setUserRoleAction(validatedData);

      // Check the result and return the appropriate response
      if (result.success) {
        return NextResponse.json(result);
      } else {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
    } catch (validationError) {
      // Handle validation errors separately
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(ErrorHandler.handleZodError(validationError), {
          status: 400,
        });
      }
      // Rethrow other validation errors to be caught in the outer catch block
      throw validationError;
    }
  } catch (error: unknown) {
    // Handle general API errors
    const errorResponse = ErrorHandler.handleApiError(error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
