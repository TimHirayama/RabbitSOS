import { ApiResponse } from "@/types/api";

export function successResponse<T>(data?: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function errorResponse<T = null>(message: string): ApiResponse<T> {
  return {
    success: false,
    error: message,
  };
}
