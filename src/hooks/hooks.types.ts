export enum ErrorMessages {
  NOT_FOUND = 'wrong_route_error',
  INTERNAL_SERVER_ERROR = 'generic_error',
}

export interface ApiError {
  code: number;
  message: ErrorMessages;
  description?: string;
}
