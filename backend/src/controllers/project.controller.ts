import type { Request, Response } from "express";
import { projectService } from "../services/project.service.js";
export const projectController={list:async(req:Request,res:Response)=>{const q=req.query as {limit?:string;offset?:string};res.json({data:await projectService.list(Number(q.limit??20),Number(q.offset??0))});},get:async(req:Request,res:Response)=>res.json({data:await projectService.get(String(req.params.id))}),contributors:async(req:Request,res:Response)=>res.json({data:await projectService.contributors(String(req.params.id))})};
