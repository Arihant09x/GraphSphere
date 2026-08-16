import type { Request, Response } from "express";
import { developerService } from "../services/developer.service.js";
export const developerController={
 list:async(req:Request,res:Response)=>{const {limit=20,offset=0}=req.query as unknown as {limit:number;offset:number};res.json({data:await developerService.list(Number(limit),Number(offset))});},
 get:async(req:Request,res:Response)=>res.json({data:await developerService.get(String(req.params.id))}),
 network:async(req:Request,res:Response)=>{const {depth=2,limit=20}=req.query as {depth?:string;limit?:string};res.json({data:await developerService.network(String(req.params.id),Number(depth),Number(limit))});},
};
