export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string; // Optional: for success messages (e.g. "Update Successful")
};
