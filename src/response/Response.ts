import { Response } from 'express';

enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
  }

export class HttpResponse {
    private code: number = 200;
    private data: object;
    private type: string;
    
    constructor(type: string, data: object) {
        this.type = type;
        this.data = data;
    }

    public send(res: Response): Response {
        return res.status(this.code).json({[this.type]: this.data});
    }
}

export class BadRequest {
    private message: String;
    private code: number = ResponseStatus.BAD_REQUEST;

    constructor(message:String) {
        this.message = message;
    }

    public send(res: Response): Response {
        return res.status(this.code).json({error: this.message});
    }
    
}

export class NotFound {
    private code: number = ResponseStatus.NOT_FOUND;
    private message: string = "address not found";

    public send(res: Response): Response {
        return res.status(this.code).json({error: this.message});
    }
}

export class InternalServerError {
    private code: number = ResponseStatus.INTERNAL_ERROR;
    private message: string = "Internal server error";

    public send(res: Response): Response {
        return res.status(this.status).json({error: this.message})
    }
}

export class UnauthorizedError {
    private code: number = ResponseStatus.UNAUTHORIZED;
    private message: string = "Unauthorized";

    public send(res: Response): Response {
        return res.status(this.code).json({error: this.message})
    }
}