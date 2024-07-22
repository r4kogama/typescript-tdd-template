import Data from "../model/types";
import { Response } from "express";

export interface statusRepository{
    statusOk(res: Response, data?: Data):Response,
    statusCreated(res: Response, data?: Data):Response,
    statusBadRequest(res: Response, data?: Data):Response,
    statusNotFound(res: Response, data?: Data):Response,
    statusError(res: Response, data?: Data): Response,
    statusUnauthorized(res: Response, data?: Data): Response,
    statusForbidden(res: Response, data? : Data):Response  
}