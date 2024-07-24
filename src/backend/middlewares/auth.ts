import express, { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../shared/response/httpResponse';

export const authMiddelware = (req: Request, res: Response, next: NextFunction)=>{
    const header: string | undefined = req.headers['authorization'];
    const data: Record<string, string> = {message: "No authorization"}
    const statusRepository : HttpResponse = new HttpResponse();
    if(!header){
       return statusRepository.statusForbidden(res, data )
    }
    //const credentials:string = Buffer.from('admin:admin').toString('base64');
    const credentials: string = header.split(' ')[1];
    console.log(credentials);
    if(!credentials){
        return statusRepository.statusForbidden(res, data )
    }

    const decoCredentias: string = Buffer.from(credentials, 'base64').toString('utf-8');
    const [user, password] = decoCredentias.split(':');
    console.log(decoCredentias);
    if(user === 'admin' && password === 'admin'){
        return next();
    }
    return statusRepository.statusForbidden(res, data )
}