export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  company?: string | null;
  subject?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

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
