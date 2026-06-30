export interface ApiResponse<T = null> {
  statusCode: number;
  message: string;
  data: T;
}
