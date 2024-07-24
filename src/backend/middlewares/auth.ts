import express, { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../shared/response/httpResponse';

const authMiddelware = (req: Request, res: Response, next: NextFunction)=>{
    const header: string | undefined = req.headers['authorization'];
    const data: Record<string, string> = {message: "No authorization"}
    const statusRepository : HttpResponse = new HttpResponse();
    if(!header){
       return statusRepository.statusForbidden(res, data )
    }
    const credentials = header.split(' ');
    console.log(credentials)
}

module.exports = authMiddelware;