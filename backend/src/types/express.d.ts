import "express";

declare global {
  namespace Express {
    interface Response {
      locals: {
        requestId?: string;
        [key: string]: unknown;
      };
    }
  }
}
