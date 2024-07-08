import { toast } from 'sonner';

class ToastHandler {
  static success(message: string) {
    toast.success(message);
  }

  static error(message: string) {
    toast.error(message);
  }

  static handleApiError(error: any) {
    if (Array.isArray(error)) {
      error.forEach((err: any) => toast.error(err.message));
    } else {
      toast.error(error);
    }
  }
}

export { ToastHandler };
