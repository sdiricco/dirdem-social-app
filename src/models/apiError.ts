export class ApiError extends Error {
    details: string;
    type: string;
    code: number;
    constructor(message = "", { details = "", type = "", code = 0 } = {}) {
      super(message);
      this.name = "api-error";
      this.details = details;
      this.type = type;
      this.code = code;
    }
  }