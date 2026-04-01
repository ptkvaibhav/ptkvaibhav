export interface ContactApiSuccessResponse {
  success: true;
  message: string;
}

export interface ContactApiBotSuccessResponse {
  ok: true;
}

export interface ContactApiErrorResponse {
  error: string;
}

export type ContactApiResponse =
  | ContactApiSuccessResponse
  | ContactApiBotSuccessResponse
  | ContactApiErrorResponse;
