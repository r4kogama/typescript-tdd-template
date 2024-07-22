import  HttpStatus  from "../model/httpStatusResponse";
import  Data  from "../model/types";
import { Response } from "express";
import { statusRepository } from "../repositories/statusRepository";


export class HttpResponse implements statusRepository {
    statusOk(res: Response, data?: Data):Response{
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message : "Success",
            data : data
        });
    }
    statusCreated(res: Response, data?: Data):Response{
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            message : "Created",
            data : data
        });
    }
    statusBadRequest(res: Response, data?: Data):Response{
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message : "Bad request",
            data : data
        });
    }
    statusNotFound(res: Response, data?: Data):Response{
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message : "Not found",
            data : data
        });
    }
    statusError(res: Response, data?: Data): Response{
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message : "Internal server error",
            data : data
        })
    }
    statusUnauthorized(res: Response, data?: Data): Response{
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message : "Unauthorized",
            data : data
        })
    }
    statusForbidden(res: Response, data? : Data):Response{
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message : "Forbidden",
            data : data
        })
    }
}