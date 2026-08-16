import type { Request, Response } from "express";
import { technologyService } from "../services/technology.service.js";
export const technologyController={list:async(req:Request,res:Response)=>{const q=req.query as {limit?:string;offset?:string};res.json({data:await technologyService.list(Number(q.limit??20),Number(q.offset??0))});},get:async(req:Request,res:Response)=>res.json({data:await technologyService.get(String(req.params.id))}),developers:async(req:Request,res:Response)=>res.json({data:await technologyService.developers(String(req.params.id))})};
