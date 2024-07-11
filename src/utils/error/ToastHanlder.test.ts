import { toast } from 'sonner';
import { ToastHandler } from './ToastHandler';

// Mock the toast methods
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ToastHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call toast.success with the correct message', () => {
    const message = 'Success message';
    ToastHandler.success(message);
    expect(toast.success).toHaveBeenCalledWith(message);
  });

  it('should call toast.error with the correct message', () => {
    const message = 'Error message';
    ToastHandler.error(message);
    expect(toast.error).toHaveBeenCalledWith(message);
  });

  it('should call toast.error for each error message in an array', () => {
    const errors = [{ message: 'Error 1' }, { message: 'Error 2' }];
    ToastHandler.handleApiError(errors);
    expect(toast.error).toHaveBeenCalledWith('Error 1');
    expect(toast.error).toHaveBeenCalledWith('Error 2');
  });

  it('should call toast.error with a single error message', () => {
    const error = 'Single error message';
    ToastHandler.handleApiError(error);
    expect(toast.error).toHaveBeenCalledWith(error);
  });
});
