import type { Request, Response } from "express";
import { searchService } from "../services/search.service.js";
export const searchController={search:async(req:Request,res:Response)=>{const q=req.query as {q:string;limit?:string};res.json({data:await searchService.search(q.q,Number(q.limit??10))});}};
